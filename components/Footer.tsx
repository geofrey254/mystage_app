import React from "react";
import Link from "next/link";

function Footer() {
  const myDate = new Date();
  return (
    <footer className="flex justify-center items-center p-2">
      <div className="container flex justify-center">
        <div className="row flex text-center items-center gap-6">
          <div>
            <h4 className="text-sm text-[#ffa800] font-semibold">
              &copy;{myDate.getFullYear()} &nbsp; <Link href="/">MyStage</Link>
            </h4>
          </div>
          <div className="text-[#392a0b]">|</div>
          <div>
            <Link
              href="/Privacy_Statement"
              className="text-[#ffa800] font-semibold"
            >
              Privacy Statement
            </Link>
          </div>
          <div className="text-[#392a0b]">|</div>
          <div>
            <Link
              href="/Terms_and_Conditions"
              className="text-[#ffa800] font-semibold"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
