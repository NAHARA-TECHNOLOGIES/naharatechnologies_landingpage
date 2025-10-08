"use client";

import TitleDescription from "@/components/TitleDescription";
import { whatWeDo } from "@/constants";
import React from "react";
import { motion } from "framer-motion";
import { Edit } from "lucide-react";

const titleDescContainer = {
  hidden: { opacity: 0, transition: { when: "afterChildren" } },
  visible: {
    opacity: 1,
    transition: { when: "beforeChildren", staggerChildren: 0.6 },
  },
};

const title = {
  hidden: { x: 200 },
  visible: { x: 0 },
};

const desc = {
  hidden: { x: -200, opacity: [0] },
  visible: { x: 0, opacity: [0, 0.25, 0.5, 0.75, 1.0] },
};

const WhatWeDo = () => {
  return (
    <div className="bg-white  dark:bg-gray-900
             text-gray-900 dark:text-gray-100  px-6 py-10 lg:pt-[67px] lg:px-[105px]">
      <div className="container">
        <TitleDescription
          title="What We Do"
          titleStyle="section-title"
          headerNumber={2}
          desc="We provide the Perfect Solution to your business growth"
          descStyle="font-medium mt-2 hidden lg:block text-2xl text-center text-gray-500"
          containerAnimProps={{
            initial: "hidden",
            variants: titleDescContainer,
            whileInView: "visible",
          }}
          titleAnimProps={{ variants: title }}
          descAnimProps={{ variants: desc }}
        />

        <motion.div
          className="lg:flex  justify-between gap-x-3 mt-10"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { when: "beforeChildren", staggerChildren: 0.25 },
            },
          }}
          initial="hidden"
          whileInView="visible"
        >
          {[0, 1].map((row) => (
            <div key={row} className="flex-1 flex flex-col gap-y-5">
              {whatWeDo
                .slice(
                  Math.floor((whatWeDo.length / 2) * row),
                  Math.floor((whatWeDo.length / 2) * (row + 1))
                )
                .map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.article
                      key={item.id}
                      className="border border-white  dark:border-black shadow-md p-6 my-5 flex flex-col justify-center items-center lg:my-0 flex-1 mx-2"
                      variants={{
                        hidden: { opacity: 0, y: index % 2 === 0 ? -100 : 100 },
                        visible: { opacity: 1, y: 0 },
                      }}
                    >
                      <motion.div
                        variants={{
                          hidden: { scale: 0 },
                          visible: { scale: [1.5, 1] },
                        }}
                        className="size-10 lg:size-10 rounded-xl bg-[#FEECEA]/50 flex items-center  justify-center transition-shadow"
                      >
                        <Icon size={30} color="red" strokeWidth={2.0} />
                      </motion.div>

                      <TitleDescription
                        className="mt-[15px] flex flex-col justify-center items-center text-center"
                        title={item.title}
                        desc={item.text}
                        titleStyle="font-semibold text-xl"
                        descStyle="mt-2 text-gray-500 text-md"
                      />
                    </motion.article>
                  );
                })}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default WhatWeDo;
