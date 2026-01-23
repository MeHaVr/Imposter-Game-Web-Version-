const selectClassNames = {
  container: () => "w-full",

  control: (state: any) =>
    `w-full rounded-lg px-2 py-1 text-sm transition outline-none
     bg-white/10 text-white
     ${state.isFocused ? "ring-2 ring-blue-500/60 bg-white/15" : ""}
    `,

  valueContainer: () => "px-2",

  singleValue: () => "text-white text-sm",

  placeholder: () => "text-white/40 text-sm",

  indicatorsContainer: () => "text-white/60",

  dropdownIndicator: () => "text-white/60 hover:text-white transition",

  indicatorSeparator: () => "hidden",

  menu: () =>
    "mt-2 rounded-xl bg-neutral-900/95 backdrop-blur-md border border-white/10 overflow-hidden shadow-xl",

  option: (state: any) =>
    `px-4 py-2.5 cursor-pointer text-sm transition text-white
     ${
       state.isSelected
         ? "bg-blue-500/30"
         : state.isFocused
           ? "bg-white/10"
           : ""
     }
    `,
};
export default selectClassNames;
