import React from "react";

export default function Test() {
  return (
    <div className="p-8">
      <a
        href="https://www.refactoringui.com/?ref=sidebar"
        className="relative block pt-80 -m-6 p-6 rounded-lg focus:outline-none focus:bg-slate-50 dark:focus:bg-slate-800/25"
      >
        <img
          className="pointer-events-none h-[673px] w-[536px] max-w-none absolute -top-[112px] -right-6"
          src="https://tailwindcss.com/img/refactoring-ui-sidebar.png"
          alt="Refactoring UI by Adam Wathan and Steve Schoger"
          decoding="async"
        />
        <div>
          <p className="text-[0.8125rem] font-semibold leading-5 text-sky-500 dark:text-sky-400">
            From the creators of Tailwind CSS
          </p>
          <p className="mt-1 text-base font-bold tracking-tight leading-[1.375] text-slate-900 dark:text-slate-200">
            Make your ideas look awesome, without relying on a designer.
          </p>
          <figure className="mt-6 pl-4 border-l border-slate-100 dark:border-slate-700">
            <blockquote className="text-sm leading-5 text-slate-600 dark:text-slate-400">
              “This is the survival kit I wish I had when I started building
              apps.”
            </blockquote>
            <figcaption className="mt-3 text-xs leading-5 text-slate-500">
              Derrick Reimer,
              <span className="">SavvyCal</span>
            </figcaption>
          </figure>
        </div>
      </a>
    </div>
  );
}
