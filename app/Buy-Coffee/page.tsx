import React from "react";

function page() {
  return (
    <section className="coffee w-full flex justify-center items-center py-20 px-8 md:px-0">
      <div className="container grid grid-cols-1 gap-8">
        <div className="part1 text-center">
          <h2 className="text-2xl font-semibold text-[#392a0b] mb-4">
            Fuel My Creativity! ☕✨
          </h2>
          <p className="text-[#392a0b] text-center">
            Hey there! If you enjoy the magic of our app and want to keep the
            caffeine flowing, consider buying me a coffee! Your support helps
            keep the wheels turning (and my brain buzzing) as I work to make
            your bus-finding experience even better.
          </p>
        </div>

        <hr className="border-[#ffa800] my-8" />

        <div className="text-center flex flex-col md:flex-row justify-center items-center gap-12 md:gap-24">
          <div className="flex flex-col gap-4">
            <h4 className="text-xl md:text-3xl font-semibold bg-[#ffa800] rounded-xl p-4 text-white">
              POCHI LA BIASHARA
            </h4>
            <h5 className="text-xl font-bold text-[#392a0b]">
              +254 7578 07097
            </h5>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-xl md:text-3xl font-semibold bg-[#ffa800] rounded-xl p-4 text-white">
              SEND MONEY
            </h4>
            <h5 className="text-xl font-bold text-[#392a0b]">
              +254 7578 07097
            </h5>
          </div>
        </div>

        <hr className="border-[#ffa800] my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-12 md:gap-6">
          <div className="part2 text-center">
            <h2 className="text-2xl font-semibold text-[#392a0b] mb-4">
              Why Coffee? ☕
            </h2>
            <p className="text-[#392a0b] text-center">
              Because every great idea starts with a cup of coffee! Your
              generous contribution helps me fuel late-night coding sessions and
              tackle those pesky bugs with a smile.
            </p>
          </div>

          <div className="part3 text-center">
            <h2 className="text-2xl font-semibold text-[#392a0b] mb-4">
              What{"'"}s in It for You? 🫵
            </h2>
            <p className="text-[#392a0b] text-center">
              Because every great idea starts with a cup of coffee! Your
              generous contribution helps me fuel late-night coding sessions and
              tackle those pesky bugs with a smile.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default page;
