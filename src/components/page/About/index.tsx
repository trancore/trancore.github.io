import { TabGroup } from "@headlessui/react";

import Section from "~/components/ui/Section";
import Splash from "~/components/ui/Splash";
import Tab from "~/components/ui/Tab";
import qualificationsJson from "~/consts/qualifications.json";
import skillsJson from "~/consts/skills.json";
import { cn } from "~/utils/cn";

export default function About() {
  const themeColor = "blue-200";
  const backgroundColor = `bg-${themeColor}`;
  const textColor = `text-${themeColor}`;
  const skills = skillsJson as string[];
  const qualifications = qualificationsJson as {
    date: string;
    name: string;
    status: string;
  }[];

  return (
    <>
      <Splash
        title="About Me"
        descriptions={[
          "私のことについて紹介します。",
          "学歴、スキル、取得した資格について記載します。",
        ]}
        linkButtton={{ href: "/products", label: "View My Products" }}
        backgroundColor={backgroundColor}
      />
      <div className={cn("max-w-7xl gap-4 p-6", "m-auto grid grid-cols-2")}>
        <div className={cn("col-span-2")}>
          <Section title="Me">
            <div className={cn("gap-10", "flex items-center")}>
              <div
                className={cn(
                  "size-48",
                  `overflow-hidden rounded-full ${backgroundColor}`,
                )}
              >
                <img
                  alt="me"
                  src="/src/assets/images/me_1024.svg"
                  className={cn("size-full object-cover")}
                />
              </div>
              <div>
                <p className={cn("font-bold text-2xl")}>trancore</p>
                <p className={cn("mt-1", "text-xs", "text-gray-500")}>
                  (一応本名は避けておきます)
                </p>

                <p className={cn("mt-3")}>I'm a Frontend Developer.</p>
                <p>ご訪問いただきありがとうございます。</p>
                {/* TODO: 何か考える */}
              </div>
            </div>
          </Section>
        </div>
        <div className={cn("col-span-1")}>
          <Section title="Skills">
            <TabGroup className={cn("gap-2", "flex flex-wrap")}>
              {skills.map((skillName) => (
                <Tab
                  key={skillName}
                  text={skillName}
                  backgroundColor={backgroundColor}
                />
              ))}
            </TabGroup>
          </Section>
        </div>
        <div className={cn("col-span-1")}>
          <Section title="Qualification">
            <ul>
              {qualifications.map((qualification) => (
                <li
                  key={qualification.name}
                  className={cn("flex justify-between")}
                >
                  <div className={cn("gap-4", "flex")}>
                    <span>{qualification.date}</span>
                    <span className={cn("font-semibold")}>
                      {qualification.name}
                    </span>
                  </div>
                  <span className={cn("font-black", `${textColor}`)}>
                    {qualification.status}
                  </span>
                </li>
              ))}
            </ul>
          </Section>
        </div>
      </div>
    </>
  );
}
