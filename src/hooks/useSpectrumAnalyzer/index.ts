import { useEffect, useRef, useState } from "react";

// 高速フーリエ変換の分割サイズ
const FFT_SIZE = 128 as const;

type Options = {
  audioSrc: string;
};

/**
 * オーディオの周波数スペクトルを視覚化するスペクトラムアナライザーを実装するためのカスタムフック。
 *
 * Web Audio APIを利用して、指定された音声ソース(`audioSrc`)を分析し、
 * `canvasRef`として渡されるcanvas要素に周波数データを描画します。
 * 音声はミュートされているため、ユーザーには聞こえません。
 *
 * @param {object} options - フックのコンフィグレーション。
 * @param {string} options.audioSrc - 分析対象となる音声ファイルのURL。Blob URLなどを想定しています。
 *
 * @returns アナライザーの制御に必要な以下のプロパティと関数を含むオブジェクト。
 * - `canvasRef`: `canvas`要素にアタッチするための`RefObject`。
 * - `start`: 分析と描画を開始します。一時停止からは再開します。
 * - `pause`: 分析と描画を一時停止します。
 * - `stop`: 分析と描画を完全に停止します。
 *
 * @example
 * const AudioVisualizer = ({ src }) => {
 *   const { canvasRef, start, pause, stop } = useSpectrumAnalyzer({ audioSrc: src });
 *
 *   return (
 *     <div>
 *       <canvas ref={canvasRef} width="300" height="100" />
 *       <button onClick={start}>Play</button>
 *       <button onClick={pause}>Pause</button>
 *       <button onClick={stop}>Stop</button>
 *     </div>
 *   );
 * }
 */
export default function useSpectrumAnalyzer({ audioSrc }: Options) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);

  // audioSrcが変更されたらAudioBufferを読み込む
  useEffect(() => {
    if (!audioSrc) return;

    async function fetchAndDecodeAudio() {
      try {
        // AudioContextを初期化
        if (!audioContextRef.current) {
          audioContextRef.current = new AudioContext();
        }
        const audioContext = audioContextRef.current;

        // blob URLからデータを取得
        const response = await fetch(audioSrc);
        const arrayBuffer = await response.arrayBuffer();

        // ArrayBufferをAudioBufferにデコード
        const decodedAudioBuffer =
          await audioContext.decodeAudioData(arrayBuffer);
        setAudioBuffer(decodedAudioBuffer);
      } catch (_error) {
        console.error("スペクトルの解析に失敗しました");
      }
    }

    fetchAndDecodeAudio();

    // コンポーネントのアンマウント、またはaudioSrc変更時にクリーンアップ
    return () => {
      // 実行中のオーディオ処理をすべて停止・切断・破棄する
      sourceRef.current?.stop();
      sourceRef.current?.disconnect();
      analyserRef.current?.disconnect();
      audioContextRef.current?.close();

      // すべての参照をnullにリセットする
      sourceRef.current = null;
      analyserRef.current = null;
      audioContextRef.current = null;
    };
  }, [audioSrc]);

  /** スペクトルアナライザの描画ループ */
  function render() {
    // canavs要素やanalyserが取得できない場合は終了
    if (!canvasRef.current || !analyserRef.current) {
      console.log("スペクトルアナライザの描画に失敗しました");
      return;
    }

    const canvas = canvasRef.current;
    const canvasContext = canvas.getContext("2d");
    const analyser = analyserRef.current;

    // getContextがサポートされていない場合は終了
    if (!canvasContext) {
      console.log("スペクトルアナライザの描画に失敗しました");
      return;
    }

    const spectrums = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(spectrums);

    canvasContext.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < spectrums.length; i++) {
      canvasContext.fillStyle = "black";
      //   canvasContext.strokeStyle = "black";

      canvasContext.fillRect(i * 4.75, canvas.height, 3, -spectrums[i] * 0.5);
      //   canvasContext.strokeRect(i * 10, canvas.height, 5, -spectrums[i] * 0.5);
    }

    // 次の描画フレームを予約
    animationFrameIdRef.current = requestAnimationFrame(render);
  }

  /** スペクトルアナライザの開始・再開 */
  function start(
    /** 最初からスタートさせるかどうか */
    isRestart?: boolean,
  ) {
    // AudioBufferまたはAudioContextが準備できていない場合は何もしない
    if (!audioBuffer || !audioContextRef.current) {
      console.log("スペクトルアナライザの開始に失敗しました");
      return;
    }

    const audioContext = audioContextRef.current;

    // 音楽が一時停止中、かつ音楽ソースが変わっていない場合は既存のsourceをそのまま使う(コンテキストを再開する)
    if (audioContext.state === "suspended" && !isRestart) {
      audioContext.resume();
      render(); // 描画ループを再開
      return;
    }

    // 既存のsourceがあれば停止・切断 (曲の変更などで再スタートする場合)
    if (sourceRef.current) {
      sourceRef.current.stop();
      sourceRef.current.disconnect();
    }

    // 既存の描画ループがあればキャンセル
    if (animationFrameIdRef.current) {
      cancelAnimationFrame(animationFrameIdRef.current);
    }

    // AnalyserNodeをセットアップ（まだなければ）
    if (!analyserRef.current) {
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = FFT_SIZE;
      analyserRef.current = analyser;
    }
    const analyser = analyserRef.current;

    // AudioBufferSourceNodeを作成し、デコード済みのAudioBufferをセット
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    sourceRef.current = source;

    // GainNodeを作成して音量を0にする
    const gainNode = audioContext.createGain();
    gainNode.gain.value = 0;

    // 各ノードを接続
    source.connect(analyser);
    analyser.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // 再生を開始
    source.start(0);
    // 描画ループを開始
    render();
  }

  /** スペクトルアナライザの一時停止 */
  const pause = () => {
    // AudioContextが実行中の場合のみ一時停止する
    if (audioContextRef.current?.state === "running") {
      audioContextRef.current.suspend();
    }
    // 描画ループが実行中であればキャンセル
    if (animationFrameIdRef.current) {
      cancelAnimationFrame(animationFrameIdRef.current);
      animationFrameIdRef.current = null;
    }
  };

  /** スペクトルアナライザの停止 */
  const stop = () => {
    // 再生中のsourceがあれば停止
    if (sourceRef.current) {
      sourceRef.current.stop();
      sourceRef.current.disconnect();
    }
    // 描画ループが実行中であればキャンセル
    if (animationFrameIdRef.current) {
      cancelAnimationFrame(animationFrameIdRef.current);
      animationFrameIdRef.current = null;
    }
  };

  return { canvasRef, start, pause, stop };
}
