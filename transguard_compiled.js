const { useState, useEffect, useRef, useMemo, useCallback } = React;
const Shield = (props) => /* @__PURE__ */ React.createElement(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "w-4 h-4",
    ...props
  },
  /* @__PURE__ */ React.createElement("path", { d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" })
);
const Activity = (props) => /* @__PURE__ */ React.createElement(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "w-4 h-4",
    ...props
  },
  /* @__PURE__ */ React.createElement("path", { d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.22 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.46 12H2" })
);
const Usb = (props) => /* @__PURE__ */ React.createElement(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "w-4 h-4",
    ...props
  },
  /* @__PURE__ */ React.createElement("circle", { cx: "10", cy: "7", r: "1" }),
  /* @__PURE__ */ React.createElement("circle", { cx: "4", cy: "20", r: "1" }),
  /* @__PURE__ */ React.createElement("path", { d: "M4.7 19.3 19 5" }),
  /* @__PURE__ */ React.createElement("path", { d: "m21 3-3 1 2 2Z" }),
  /* @__PURE__ */ React.createElement("circle", { cx: "9.2", cy: "14.8", r: "1" }),
  /* @__PURE__ */ React.createElement("path", { d: "m10 7 6 6" }),
  /* @__PURE__ */ React.createElement("circle", { cx: "14", cy: "17", r: "1" }),
  /* @__PURE__ */ React.createElement("path", { d: "m14.8 9.2 4.5 4.5" })
);
const Wifi = (props) => /* @__PURE__ */ React.createElement(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "w-4 h-4",
    ...props
  },
  /* @__PURE__ */ React.createElement("path", { d: "M12 20h.01" }),
  /* @__PURE__ */ React.createElement("path", { d: "M2 8.82a15 15 0 0 1 20 0" }),
  /* @__PURE__ */ React.createElement("path", { d: "M5 12.859a10 10 0 0 1 14 0" }),
  /* @__PURE__ */ React.createElement("path", { d: "M8.5 16.429a5 5 0 0 1 7 0" })
);
const Cpu = (props) => /* @__PURE__ */ React.createElement(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "w-4 h-4",
    ...props
  },
  /* @__PURE__ */ React.createElement("rect", { width: "16", height: "16", x: "4", y: "4", rx: "2" }),
  /* @__PURE__ */ React.createElement("rect", { width: "6", height: "6", x: "9", y: "9", rx: "1" }),
  /* @__PURE__ */ React.createElement("path", { d: "M15 2v2" }),
  /* @__PURE__ */ React.createElement("path", { d: "M15 20v2" }),
  /* @__PURE__ */ React.createElement("path", { d: "M2 15h2" }),
  /* @__PURE__ */ React.createElement("path", { d: "M2 9h2" }),
  /* @__PURE__ */ React.createElement("path", { d: "M20 15h2" }),
  /* @__PURE__ */ React.createElement("path", { d: "M20 9h2" }),
  /* @__PURE__ */ React.createElement("path", { d: "M9 2v2" }),
  /* @__PURE__ */ React.createElement("path", { d: "M9 20v2" })
);
const Thermometer = (props) => /* @__PURE__ */ React.createElement(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "w-4 h-4",
    ...props
  },
  /* @__PURE__ */ React.createElement("path", { d: "M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" })
);
const Flame = (props) => /* @__PURE__ */ React.createElement(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "w-4 h-4",
    ...props
  },
  /* @__PURE__ */ React.createElement("path", { d: "M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" })
);
const Zap = (props) => /* @__PURE__ */ React.createElement(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "w-4 h-4",
    ...props
  },
  /* @__PURE__ */ React.createElement("polygon", { points: "13 2 3 14 12 14 11 22 21 10 12 10 13 2" })
);
const Gauge = (props) => /* @__PURE__ */ React.createElement(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "w-4 h-4",
    ...props
  },
  /* @__PURE__ */ React.createElement("path", { d: "m12 14 4-4" }),
  /* @__PURE__ */ React.createElement("path", { d: "M3.34 19a10 10 0 1 1 17.32 0" })
);
const Waves = (props) => /* @__PURE__ */ React.createElement(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "w-4 h-4",
    ...props
  },
  /* @__PURE__ */ React.createElement("path", { d: "M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" }),
  /* @__PURE__ */ React.createElement("path", { d: "M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" }),
  /* @__PURE__ */ React.createElement("path", { d: "M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" })
);
const CloudFog = (props) => /* @__PURE__ */ React.createElement(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "w-4 h-4",
    ...props
  },
  /* @__PURE__ */ React.createElement("path", { d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" }),
  /* @__PURE__ */ React.createElement("path", { d: "M16 17H7" }),
  /* @__PURE__ */ React.createElement("path", { d: "M17 21H9" })
);
const Sun = (props) => /* @__PURE__ */ React.createElement(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "w-4 h-4",
    ...props
  },
  /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "4" }),
  /* @__PURE__ */ React.createElement("path", { d: "M12 2v2" }),
  /* @__PURE__ */ React.createElement("path", { d: "M12 20v2" }),
  /* @__PURE__ */ React.createElement("path", { d: "m4.93 4.93 1.41 1.41" }),
  /* @__PURE__ */ React.createElement("path", { d: "m17.66 17.66 1.41 1.41" }),
  /* @__PURE__ */ React.createElement("path", { d: "M2 12h2" }),
  /* @__PURE__ */ React.createElement("path", { d: "M20 12h2" }),
  /* @__PURE__ */ React.createElement("path", { d: "m6.34 17.66-1.41 1.41" }),
  /* @__PURE__ */ React.createElement("path", { d: "m19.07 4.93-1.41 1.41" })
);
const Play = (props) => /* @__PURE__ */ React.createElement(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "w-4 h-4",
    ...props
  },
  /* @__PURE__ */ React.createElement("polygon", { points: "6 3 20 12 6 21 6 3" })
);
const Pause = (props) => /* @__PURE__ */ React.createElement(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "w-4 h-4",
    ...props
  },
  /* @__PURE__ */ React.createElement("rect", { x: "6", y: "4", width: "4", height: "16" }),
  /* @__PURE__ */ React.createElement("rect", { x: "14", y: "4", width: "4", height: "16" })
);
const Download = (props) => /* @__PURE__ */ React.createElement(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "w-4 h-4",
    ...props
  },
  /* @__PURE__ */ React.createElement("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
  /* @__PURE__ */ React.createElement("polyline", { points: "7 10 12 15 17 10" }),
  /* @__PURE__ */ React.createElement("line", { x1: "12", x2: "12", y1: "15", y2: "3" })
);
const Sliders = (props) => /* @__PURE__ */ React.createElement(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "w-4 h-4",
    ...props
  },
  /* @__PURE__ */ React.createElement("line", { x1: "4", x2: "4", y1: "21", y2: "14" }),
  /* @__PURE__ */ React.createElement("line", { x1: "4", x2: "4", y1: "10", y2: "3" }),
  /* @__PURE__ */ React.createElement("line", { x1: "12", x2: "12", y1: "21", y2: "12" }),
  /* @__PURE__ */ React.createElement("line", { x1: "12", x2: "12", y1: "8", y2: "3" }),
  /* @__PURE__ */ React.createElement("line", { x1: "20", x2: "20", y1: "21", y2: "16" }),
  /* @__PURE__ */ React.createElement("line", { x1: "20", x2: "20", y1: "12", y2: "3" }),
  /* @__PURE__ */ React.createElement("line", { x1: "1", x2: "7", y1: "14", y2: "14" }),
  /* @__PURE__ */ React.createElement("line", { x1: "9", x2: "15", y1: "8", y2: "8" }),
  /* @__PURE__ */ React.createElement("line", { x1: "17", x2: "23", y1: "16", y2: "16" })
);
const Terminal = (props) => /* @__PURE__ */ React.createElement(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "w-4 h-4",
    ...props
  },
  /* @__PURE__ */ React.createElement("polyline", { points: "4 17 10 11 4 5" }),
  /* @__PURE__ */ React.createElement("line", { x1: "12", x2: "20", y1: "19", y2: "19" })
);
const Code2 = (props) => /* @__PURE__ */ React.createElement(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "w-4 h-4",
    ...props
  },
  /* @__PURE__ */ React.createElement("path", { d: "m18 16 4-4-4-4" }),
  /* @__PURE__ */ React.createElement("path", { d: "m6 8-4 4 4 4" }),
  /* @__PURE__ */ React.createElement("path", { d: "m14.5 4-5 16" })
);
const Copy = (props) => /* @__PURE__ */ React.createElement(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "w-4 h-4",
    ...props
  },
  /* @__PURE__ */ React.createElement("rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2" }),
  /* @__PURE__ */ React.createElement("path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" })
);
const Check = (props) => /* @__PURE__ */ React.createElement(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "w-4 h-4",
    ...props
  },
  /* @__PURE__ */ React.createElement("polyline", { points: "20 6 9 17 4 12" })
);
const X = (props) => /* @__PURE__ */ React.createElement(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "w-4 h-4",
    ...props
  },
  /* @__PURE__ */ React.createElement("path", { d: "M18 6 6 18" }),
  /* @__PURE__ */ React.createElement("path", { d: "m6 6 12 12" })
);
const AlertTriangle = (props) => /* @__PURE__ */ React.createElement(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "w-4 h-4",
    ...props
  },
  /* @__PURE__ */ React.createElement("path", { d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" }),
  /* @__PURE__ */ React.createElement("line", { x1: "12", x2: "12", y1: "9", y2: "13" }),
  /* @__PURE__ */ React.createElement("line", { x1: "12", x2: "12.01", y1: "17", y2: "17" })
);
const CheckCircle2 = (props) => /* @__PURE__ */ React.createElement(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "w-4 h-4",
    ...props
  },
  /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "10" }),
  /* @__PURE__ */ React.createElement("path", { d: "m9 12 2 2 4-4" })
);
const RefreshCw = (props) => /* @__PURE__ */ React.createElement(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "w-4 h-4",
    ...props
  },
  /* @__PURE__ */ React.createElement("path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" }),
  /* @__PURE__ */ React.createElement("path", { d: "M21 3v5h-5" }),
  /* @__PURE__ */ React.createElement("path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" }),
  /* @__PURE__ */ React.createElement("path", { d: "M8 16H3v5" })
);
const Radio = (props) => /* @__PURE__ */ React.createElement(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "w-4 h-4",
    ...props
  },
  /* @__PURE__ */ React.createElement("path", { d: "M4.9 19.1C1 15.2 1 8.8 4.9 4.9" }),
  /* @__PURE__ */ React.createElement("path", { d: "M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5" }),
  /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "2" }),
  /* @__PURE__ */ React.createElement("path", { d: "M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5" }),
  /* @__PURE__ */ React.createElement("path", { d: "M19.1 4.9C23 8.8 23 15.1 19.1 19" })
);
const Plug = (props) => /* @__PURE__ */ React.createElement(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "w-4 h-4",
    ...props
  },
  /* @__PURE__ */ React.createElement("path", { d: "M12 22v-5" }),
  /* @__PURE__ */ React.createElement("path", { d: "M9 8V2" }),
  /* @__PURE__ */ React.createElement("path", { d: "M15 8V2" }),
  /* @__PURE__ */ React.createElement("path", { d: "M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z" })
);
const LineChart = (props) => /* @__PURE__ */ React.createElement(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "w-4 h-4",
    ...props
  },
  /* @__PURE__ */ React.createElement("path", { d: "M3 3v18h18" }),
  /* @__PURE__ */ React.createElement("path", { d: "m19 9-5 5-4-4-3 3" })
);
const Layers = (props) => /* @__PURE__ */ React.createElement(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "w-4 h-4",
    ...props
  },
  /* @__PURE__ */ React.createElement("path", { d: "m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" }),
  /* @__PURE__ */ React.createElement("path", { d: "m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" }),
  /* @__PURE__ */ React.createElement("path", { d: "m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" })
);
const Search = (props) => /* @__PURE__ */ React.createElement(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "w-4 h-4",
    ...props
  },
  /* @__PURE__ */ React.createElement("circle", { cx: "11", cy: "11", r: "8" }),
  /* @__PURE__ */ React.createElement("path", { d: "m21 21-4.3-4.3" })
);
const Filter = (props) => /* @__PURE__ */ React.createElement(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "w-4 h-4",
    ...props
  },
  /* @__PURE__ */ React.createElement("polygon", { points: "22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" })
);
const Calendar = (props) => /* @__PURE__ */ React.createElement(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "w-4 h-4",
    ...props
  },
  /* @__PURE__ */ React.createElement("rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", ry: "2" }),
  /* @__PURE__ */ React.createElement("line", { x1: "16", x2: "16", y1: "2", y2: "6" }),
  /* @__PURE__ */ React.createElement("line", { x1: "8", x2: "8", y1: "2", y2: "6" }),
  /* @__PURE__ */ React.createElement("line", { x1: "3", x2: "21", y1: "10", y2: "10" })
);
const FileText = (props) => /* @__PURE__ */ React.createElement(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "w-4 h-4",
    ...props
  },
  /* @__PURE__ */ React.createElement("path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" }),
  /* @__PURE__ */ React.createElement("path", { d: "M14 2v4a2 2 0 0 0 2 2h4" }),
  /* @__PURE__ */ React.createElement("path", { d: "M10 9H8" }),
  /* @__PURE__ */ React.createElement("path", { d: "M16 13H8" }),
  /* @__PURE__ */ React.createElement("path", { d: "M16 17H8" })
);
const Settings = (props) => /* @__PURE__ */ React.createElement(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "w-4 h-4",
    ...props
  },
  /* @__PURE__ */ React.createElement("path", { d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" }),
  /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "3" })
);
const Plus = (props) => /* @__PURE__ */ React.createElement(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "w-4 h-4",
    ...props
  },
  /* @__PURE__ */ React.createElement("path", { d: "M5 12h14" }),
  /* @__PURE__ */ React.createElement("path", { d: "M12 5v14" })
);
const Wrench = (props) => /* @__PURE__ */ React.createElement(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "w-4 h-4",
    ...props
  },
  /* @__PURE__ */ React.createElement("path", { d: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" })
);
const Clock = (props) => /* @__PURE__ */ React.createElement(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "w-4 h-4",
    ...props
  },
  /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "10" }),
  /* @__PURE__ */ React.createElement("polyline", { points: "12 6 12 12 16 14" })
);
const ArrowUpRight = (props) => /* @__PURE__ */ React.createElement(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "w-4 h-4",
    ...props
  },
  /* @__PURE__ */ React.createElement("path", { d: "M7 7h10v10" }),
  /* @__PURE__ */ React.createElement("path", { d: "M7 17 17 7" })
);
const HardDrive = (props) => /* @__PURE__ */ React.createElement(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "w-4 h-4",
    ...props
  },
  /* @__PURE__ */ React.createElement("line", { x1: "22", x2: "2", y1: "12", y2: "12" }),
  /* @__PURE__ */ React.createElement("path", { d: "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" }),
  /* @__PURE__ */ React.createElement("line", { x1: "6", x2: "6.01", y1: "16", y2: "16" }),
  /* @__PURE__ */ React.createElement("line", { x1: "10", x2: "10.01", y1: "16", y2: "16" })
);
const Server = (props) => /* @__PURE__ */ React.createElement(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "w-4 h-4",
    ...props
  },
  /* @__PURE__ */ React.createElement("rect", { width: "20", height: "8", x: "2", y: "2", rx: "2", ry: "2" }),
  /* @__PURE__ */ React.createElement("rect", { width: "20", height: "8", x: "2", y: "14", rx: "2", ry: "2" }),
  /* @__PURE__ */ React.createElement("line", { x1: "6", x2: "6.01", y1: "6", y2: "6" }),
  /* @__PURE__ */ React.createElement("line", { x1: "6", x2: "6.01", y1: "18", y2: "18" })
);
const BarChart3 = (props) => /* @__PURE__ */ React.createElement(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "w-4 h-4",
    ...props
  },
  /* @__PURE__ */ React.createElement("path", { d: "M3 3v18h18" }),
  /* @__PURE__ */ React.createElement("path", { d: "M18 17V9" }),
  /* @__PURE__ */ React.createElement("path", { d: "M13 17V5" }),
  /* @__PURE__ */ React.createElement("path", { d: "M8 17v-3" })
);
const Database = (props) => /* @__PURE__ */ React.createElement(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "w-4 h-4",
    ...props
  },
  /* @__PURE__ */ React.createElement("ellipse", { cx: "12", cy: "5", rx: "9", ry: "3" }),
  /* @__PURE__ */ React.createElement("path", { d: "M3 5V19A9 3 0 0 0 21 19V5" }),
  /* @__PURE__ */ React.createElement("path", { d: "M3 12A9 3 0 0 0 21 12" })
);
const Bell = (props) => /* @__PURE__ */ React.createElement(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "w-4 h-4",
    ...props
  },
  /* @__PURE__ */ React.createElement("path", { d: "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" }),
  /* @__PURE__ */ React.createElement("path", { d: "M10.3 21a1.94 1.94 0 0 0 3.4 0" })
);
const User = (props) => /* @__PURE__ */ React.createElement(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "w-4 h-4",
    ...props
  },
  /* @__PURE__ */ React.createElement("path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" }),
  /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "7", r: "4" })
);
const ExternalLink = (props) => /* @__PURE__ */ React.createElement(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "w-4 h-4",
    ...props
  },
  /* @__PURE__ */ React.createElement("path", { d: "M15 3h6v6" }),
  /* @__PURE__ */ React.createElement("path", { d: "M10 14 21 3" }),
  /* @__PURE__ */ React.createElement("path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" })
);
const ChevronRight = (props) => /* @__PURE__ */ React.createElement(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "w-4 h-4",
    ...props
  },
  /* @__PURE__ */ React.createElement("path", { d: "m9 18 6-6-6-6" })
);
const Info = (props) => /* @__PURE__ */ React.createElement(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "w-4 h-4",
    ...props
  },
  /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "10" }),
  /* @__PURE__ */ React.createElement("path", { d: "M12 16v-4" }),
  /* @__PURE__ */ React.createElement("path", { d: "M12 8h.01" })
);
const SENSOR_DEFINITIONS = [
  {
    id: "oilTemp",
    name: "Top Oil Temperature",
    ic: "PT100 / DS18B20",
    tabLabel: "OIL TEMP",
    icon: Thermometer,
    unit: "\xB0C",
    decimals: 1,
    field: { base: 54.2, noise: 0.45, warn: 75, crit: 90, minAxis: 35, maxAxis: 105 },
    bench: { base: 33.4, noise: 0.3, warn: 55, crit: 70, minAxis: 20, maxAxis: 80 }
  },
  {
    id: "windingTemp",
    name: "Winding Hotspot Temp",
    ic: "IEEE C57.91 Calc / RTD",
    tabLabel: "WINDING",
    icon: Flame,
    unit: "\xB0C",
    decimals: 1,
    field: { base: 68.5, noise: 0.6, warn: 95, crit: 115, minAxis: 45, maxAxis: 135 },
    bench: { base: 38.2, noise: 0.4, warn: 65, crit: 80, minAxis: 20, maxAxis: 90 }
  },
  {
    id: "current",
    name: "Primary Load Current",
    ic: "Current CT / ACS712",
    tabLabel: "CURRENT",
    icon: Zap,
    unit: "A",
    decimals: 2,
    field: { base: 142.5, noise: 1.8, warn: 220, crit: 280, minAxis: 50, maxAxis: 320 },
    bench: { base: 0.42, noise: 0.02, warn: 1.2, crit: 1.8, minAxis: 0, maxAxis: 2.5 }
  },
  {
    id: "voltage",
    name: "Line Voltage",
    ic: "PT / ZMPT101B",
    tabLabel: "VOLTAGE",
    icon: Gauge,
    unit: "V",
    decimals: 1,
    field: { base: 415, noise: 2.1, warn: 440, crit: 460, minAxis: 360, maxAxis: 480 },
    bench: { base: 12.1, noise: 0.15, warn: 14.5, crit: 16, minAxis: 9, maxAxis: 18 }
  },
  {
    id: "vib",
    name: "Core & Tank Vibration",
    ic: "MPU6050 Accelerometer",
    tabLabel: "VIBRATION",
    icon: Waves,
    unit: "mm/s",
    decimals: 2,
    field: { base: 1.85, noise: 0.12, warn: 3.5, crit: 5, minAxis: 0.5, maxAxis: 7 },
    bench: { base: 0.85, noise: 0.08, warn: 1.5, crit: 2.5, minAxis: 0.2, maxAxis: 3.5 }
  },
  {
    id: "thd",
    name: "Harmonic Distortion",
    ic: "Fast Fourier Transform",
    tabLabel: "THD %",
    icon: Activity,
    unit: "%",
    decimals: 1,
    field: { base: 2.8, noise: 0.2, warn: 5, crit: 8, minAxis: 0.5, maxAxis: 12 },
    bench: { base: 1.8, noise: 0.15, warn: 4.5, crit: 7, minAxis: 0.5, maxAxis: 10 }
  },
  {
    id: "gas",
    name: "Dissolved Combustible Gas",
    ic: "MQ-2 Gas Sensor",
    tabLabel: "GAS (PPM)",
    icon: CloudFog,
    unit: "ppm",
    decimals: 0,
    field: { base: 120, noise: 6, warn: 350, crit: 600, minAxis: 50, maxAxis: 800 },
    bench: { base: 95, noise: 4, warn: 250, crit: 450, minAxis: 40, maxAxis: 600 }
  },
  {
    id: "ambient",
    name: "Ambient Temperature",
    ic: "DHT22 Environmental",
    tabLabel: "AMBIENT",
    icon: Sun,
    unit: "\xB0C",
    decimals: 1,
    field: { base: 32.5, noise: 0.25, warn: 48, crit: 55, minAxis: 15, maxAxis: 60 },
    bench: { base: 29.8, noise: 0.2, warn: 42, crit: 50, minAxis: 15, maxAxis: 55 }
  }
];
const ESP32_FIRMWARE_SKETCH = `/*
 * TransGuard AI \u2014 ESP32 Industrial Telemetry Gateway Firmware
 * Multi-Protocol: USB Serial (115200) + Wi-Fi HTTP /telemetry & WebSocket
 * Hardware: ESP32-WROOM-32 / DevKit V1
 * Sensors: DS18B20 / PT100 (GPIO 4), CT Sensor (ADC 34), ZMPT101B (ADC 35),
 *          MPU6050 (I2C 21/22), MQ-2 (ADC 32), DHT22 (GPIO 13)
 */

#include <WiFi.h>
#include <WebServer.h>
#include <Wire.h>
#include <OneWire.h>
#include <DallasTemperature.h>
#include <DHT.h>
#include <Adafruit_MPU6050.h>
#include <Adafruit_Sensor.h>

const char* ssid     = "TRANSGUARD_WIFI";
const char* password = "TransformerSecurePass123";

#define PIN_ONEWIRE_TEMP 4
#define PIN_CT_CURRENT   34
#define PIN_PT_VOLTAGE   35
#define PIN_MQ2_GAS      32
#define PIN_DHT          13
#define DHTTYPE          DHT22

OneWire oneWire(PIN_ONEWIRE_TEMP);
DallasTemperature ds18b20(&oneWire);
DHT dht(PIN_DHT, DHTTYPE);
Adafruit_MPU6050 mpu;
WebServer server(80);

unsigned long lastSample = 0;

float readACCurrentRMS() {
  unsigned long start = millis();
  long sumSq = 0;
  int count = 0;
  while (millis() - start < 100) {
    int v = analogRead(PIN_CT_CURRENT) - 2048;
    sumSq += (long)v * v;
    count++;
  }
  float rms = sqrt((float)sumSq / count);
  return (rms * (3.3 / 4095.0)) * 30.0; // Scaled to current calibration
}

float readACVoltageRMS() {
  unsigned long start = millis();
  long sumSq = 0;
  int count = 0;
  while (millis() - start < 100) {
    int v = analogRead(PIN_PT_VOLTAGE) - 2048;
    sumSq += (long)v * v;
    count++;
  }
  float rms = sqrt((float)sumSq / count);
  return (rms * (3.3 / 4095.0)) * 220.0; // Scaled to transformer PT ratio
}

String getTelemetryJSON() {
  ds18b20.requestTemperatures();
  float oilTemp = ds18b20.getTempCByIndex(0);
  if (oilTemp < -50 || oilTemp > 150) oilTemp = 33.4;

  float current = readACCurrentRMS();
  float voltage = readACVoltageRMS();
  if (voltage < 5.0) voltage = 12.1;

  sensors_event_t a, g, temp;
  float vibRMS = 0.85;
  if (mpu.getEvent(&a, &g, &temp)) {
    vibRMS = sqrt(a.acceleration.x*a.acceleration.x + 
                  a.acceleration.y*a.acceleration.y + 
                  a.acceleration.z*a.acceleration.z) - 9.8;
    if (vibRMS < 0) vibRMS = abs(vibRMS);
  }

  int gasRaw = analogRead(PIN_MQ2_GAS);
  float gasPPM = map(gasRaw, 0, 4095, 40, 800);
  float ambient = dht.readTemperature();
  float humidity = dht.readHumidity();
  if (isnan(ambient)) ambient = 29.8;
  if (isnan(humidity)) humidity = 56.0;

  float windingTemp = oilTemp + (current * 4.2) + 2.5;

  String json = "{";
  json += "\\"pod_id\\":\\"TG-ESP32-LOCAL\\",";
  json += "\\"oilTemp\\":" + String(oilTemp, 1) + ",";
  json += "\\"windingTemp\\":" + String(windingTemp, 1) + ",";
  json += "\\"current\\":" + String(current, 2) + ",";
  json += "\\"voltage\\":" + String(voltage, 1) + ",";
  json += "\\"vib\\":" + String(vibRMS, 2) + ",";
  json += "\\"thd\\":1.8,";
  json += "\\"gas\\":" + String(gasPPM, 0) + ",";
  json += "\\"ambient\\":" + String(ambient, 1) + ",";
  json += "\\"humidity\\":" + String(humidity, 0);
  json += "}";
  return json;
}

void setup() {
  Serial.begin(115200);
  Wire.begin(21, 22);
  ds18b20.begin();
  dht.begin();
  mpu.begin();
  analogReadResolution(12);

  WiFi.begin(ssid, password);
  server.on("/telemetry", HTTP_GET, []() {
    server.sendHeader("Access-Control-Allow-Origin", "*");
    server.send(200, "application/json", getTelemetryJSON());
  });
  server.begin();
  Serial.println("[TransGuard AI] Firmware Initialized. Ready for Streaming.");
}

void loop() {
  server.handleClient();
  if (millis() - lastSample >= 1000) {
    lastSample = millis();
    String payload = getTelemetryJSON();
    Serial.println(payload); // Broadcast to USB Web Serial
  }
}
`;
function getSensorStatus(sensorId, value, scale) {
  const def = SENSOR_DEFINITIONS.find((s) => s.id === sensorId);
  if (!def) return "NORMAL";
  const cfg = def[scale];
  if (value >= cfg.crit) return "CRITICAL";
  if (value >= cfg.warn) return "WARNING";
  return "NORMAL";
}
function computeHealthMetrics(history, scale) {
  const latest = {};
  SENSOR_DEFINITIONS.forEach((s) => {
    const arr = history[s.id];
    latest[s.id] = arr && arr.length ? arr[arr.length - 1].v : s[scale].base;
  });
  const calcSubScore = (val, base, crit) => {
    if (val <= base) return Math.min(100, Math.round(95 + (1 - val / (base || 1)) * 5));
    const ratio = (val - base) / Math.max(0.1, crit - base);
    return Math.max(12, Math.min(98, Math.round(96 - ratio * 65)));
  };
  const windingScore = calcSubScore(latest.windingTemp, SENSOR_DEFINITIONS[1][scale].base, SENSOR_DEFINITIONS[1][scale].crit);
  const oilScore = calcSubScore(latest.oilTemp, SENSOR_DEFINITIONS[0][scale].base, SENSOR_DEFINITIONS[0][scale].crit);
  const pqScore = calcSubScore(latest.thd, SENSOR_DEFINITIONS[5][scale].base, SENSOR_DEFINITIONS[5][scale].crit);
  const mechScore = calcSubScore(latest.vib, SENSOR_DEFINITIONS[4][scale].base, SENSOR_DEFINITIONS[4][scale].crit);
  const loadScore = calcSubScore(latest.current, SENSOR_DEFINITIONS[2][scale].base, SENSOR_DEFINITIONS[2][scale].crit);
  const healthIndex = Math.round(
    windingScore * 0.28 + oilScore * 0.24 + pqScore * 0.18 + mechScore * 0.16 + loadScore * 0.14
  );
  const normHotspot = scale === "field" ? latest.windingTemp : 65 + (latest.windingTemp - 35) * 1.4;
  const faa = Math.max(0.25, Math.min(12.5, Math.exp(15e3 / 383 - 15e3 / (normHotspot + 273))));
  const rulYears = Math.max(0.8, Math.min(18.5, 16.5 / Math.pow(faa, 0.55))).toFixed(1);
  const rulPct = Math.max(8, Math.min(98, Math.round(parseFloat(rulYears) / 16 * 100)));
  const anyCrit = SENSOR_DEFINITIONS.some((s) => getSensorStatus(s.id, latest[s.id], scale) === "CRITICAL");
  const anyWarn = SENSOR_DEFINITIONS.some((s) => getSensorStatus(s.id, latest[s.id], scale) === "WARNING");
  let overallStatus = "NORMAL";
  if (anyCrit || healthIndex < 55) overallStatus = "CRITICAL";
  else if (anyWarn || healthIndex < 78) overallStatus = "WARNING";
  const anomalies = [];
  SENSOR_DEFINITIONS.forEach((s) => {
    const base = s[scale].base;
    const cur = latest[s.id];
    const dev = Math.abs((cur - base) / (base || 1)) * 100;
    if (dev > 40) {
      anomalies.push({
        parameter: s.name,
        deviationPct: Math.round(dev),
        severity: dev > 80 ? "CRITICAL" : "WARNING",
        description: `${s.name} deviated ${Math.round(dev)}% above nominal baseline.`
      });
    }
  });
  const detectedFaults = [];
  if (latest.windingTemp > SENSOR_DEFINITIONS[1][scale].warn || latest.oilTemp > SENSOR_DEFINITIONS[0][scale].warn) {
    detectedFaults.push({
      fault: "Thermal Overload & Radiator Fouling",
      confidence: Math.min(96, 65 + (latest.windingTemp - SENSOR_DEFINITIONS[1][scale].warn) * 2),
      risk: "Accelerated Kraft paper tensile breakdown & oil sludging",
      action: "Check cooling fan contactors, clean radiator bank, verify ambient airflow."
    });
  }
  if (latest.vib > SENSOR_DEFINITIONS[4][scale].warn) {
    detectedFaults.push({
      fault: "Core Magnetostriction / Winding Looseness",
      confidence: 88,
      risk: "Mechanical fatigue on core clamps and winding tie-rods",
      action: "Perform vibration spectrum analysis; verify tie-rod torque during next outage."
    });
  }
  if (latest.thd > SENSOR_DEFINITIONS[5][scale].warn) {
    detectedFaults.push({
      fault: "Harmonic Distortion & Eddy Loss Overheating",
      confidence: 91,
      risk: "Excessive stray eddy losses causing localized tank wall hotspotting",
      action: "Inspect active passive harmonic filters at feeder breaker."
    });
  }
  if (latest.gas > SENSOR_DEFINITIONS[6][scale].warn) {
    detectedFaults.push({
      fault: "Low-Energy Partial Discharge / Arcing",
      confidence: 85,
      risk: "Dielectric breakdown of mineral insulating oil",
      action: "Draw physical oil sample for laboratory ASTM D3612 Dissolved Gas Analysis."
    });
  }
  return {
    latest,
    healthIndex,
    rulYears,
    rulPct,
    windingScore,
    oilScore,
    pqScore,
    mechScore,
    loadScore,
    faa,
    overallStatus,
    anomalies,
    detectedFaults
  };
}
function generateInitialHistory(scale) {
  const initial = {};
  const now = Date.now();
  SENSOR_DEFINITIONS.forEach((s) => {
    const cfg = s[scale];
    initial[s.id] = Array.from({ length: 30 }, (_, idx) => {
      const i = 29 - idx;
      const d = new Date(now - i * 1e3);
      const jitter = (Math.sin(i * 0.5) * 0.4 + (Math.random() - 0.5)) * cfg.noise * 1.2;
      return {
        t: d,
        timeStr: d.toLocaleTimeString([], { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }),
        v: Number(Math.max(0, cfg.base + jitter).toFixed(s.decimals))
      };
    });
  });
  return initial;
}
const INITIAL_FLEET = [
  {
    id: "TG-TX-101",
    name: "Substation Alpha \u2013 Main Stepdown",
    location: "Sector 4, North Grid Substation",
    capacityKva: 500,
    voltageRating: "11 kV / 415 V",
    coolingType: "ONAN (Oil Natural Air Natural)",
    manufacturer: "ABB Power Grids",
    serialNumber: "ABB-2019-TX9941",
    installationDate: "2019-04-12",
    lastServiced: "2026-08-10",
    status: "NORMAL",
    healthIndex: 92,
    rulYears: 14.8,
    activeAlertsCount: 0,
    edgeDeviceId: "ESP32-NODE-01",
    telemetry: {
      oilTemp: 48.5,
      windingTemp: 58.2,
      current: 98.4,
      voltage: 412,
      vib: 1.15,
      thd: 2.1,
      gas: 68,
      ambient: 31.2,
      humidity: 52
    }
  },
  {
    id: "TG-TX-102",
    name: "Industrial Feeder \u2013 Steel Works",
    location: "Heavy Industrial Zone, Feeder 3B",
    capacityKva: 1e3,
    voltageRating: "11 kV / 415 V",
    coolingType: "ONAF (Oil Natural Air Forced)",
    manufacturer: "Siemens Energy",
    serialNumber: "SIE-2016-TX4421",
    installationDate: "2016-11-20",
    lastServiced: "2026-05-18",
    status: "WARNING",
    healthIndex: 68,
    rulYears: 7.2,
    activeAlertsCount: 2,
    edgeDeviceId: "ESP32-NODE-02",
    telemetry: {
      oilTemp: 76.8,
      windingTemp: 88.4,
      current: 245.2,
      voltage: 408.5,
      vib: 2.92,
      thd: 5.4,
      gas: 285,
      ambient: 34.6,
      humidity: 48
    }
  },
  {
    id: "TG-TX-103",
    name: "Metro Traction Yard Transformer",
    location: "Central Rail Depot, Bay 2",
    capacityKva: 750,
    voltageRating: "22 kV / 415 V",
    coolingType: "ONAN (Oil Natural Air Natural)",
    manufacturer: "Schneider Electric",
    serialNumber: "SCH-2014-TX1108",
    installationDate: "2014-02-15",
    lastServiced: "2025-12-05",
    status: "CRITICAL",
    healthIndex: 47,
    rulYears: 2.8,
    activeAlertsCount: 3,
    edgeDeviceId: "ESP32-NODE-03",
    telemetry: {
      oilTemp: 91.2,
      windingTemp: 108.6,
      current: 282,
      voltage: 401.2,
      vib: 4.85,
      thd: 6.8,
      gas: 512,
      ambient: 36.1,
      humidity: 59
    }
  },
  {
    id: "TG-ESP32-LOCAL",
    name: "Benchtop Hardware IoT Unit",
    location: "R&D Lab 2 \u2013 Prototype Testbench",
    capacityKva: 5,
    voltageRating: "230 V / 12 V",
    coolingType: "Dry / Natural Air",
    manufacturer: "TransGuard AI Open Hardware",
    serialNumber: "TG-PROTO-ESP32-V1",
    installationDate: "2026-01-10",
    lastServiced: "2026-11-10",
    status: "NORMAL",
    healthIndex: 88,
    rulYears: 12.5,
    activeAlertsCount: 0,
    edgeDeviceId: "TG-ESP32-USB-01",
    telemetry: {
      oilTemp: 33.4,
      windingTemp: 38.2,
      current: 0.42,
      voltage: 12.1,
      vib: 0.85,
      thd: 1.8,
      gas: 95,
      ambient: 29.8,
      humidity: 56
    }
  }
];
const INITIAL_ALERTS = [
  {
    id: "ALT-1001",
    assetId: "TG-TX-103",
    timestamp: "14 mins ago",
    severity: "CRITICAL",
    parameter: "Winding Hotspot",
    value: 108.6,
    unit: "\xB0C",
    threshold: 105,
    message: "Winding hotspot temperature exceeded IEEE critical insulation limit (105\xB0C).",
    status: "ACTIVE"
  },
  {
    id: "ALT-1002",
    assetId: "TG-TX-103",
    timestamp: "25 mins ago",
    severity: "CRITICAL",
    parameter: "Combustible Gas",
    value: 512,
    unit: "ppm",
    threshold: 450,
    message: "Dissolved combustible gas concentration (MQ-2) suggests active partial arcing.",
    status: "ACTIVE"
  },
  {
    id: "ALT-1003",
    assetId: "TG-TX-102",
    timestamp: "48 mins ago",
    severity: "WARNING",
    parameter: "Top Oil Temp",
    value: 76.8,
    unit: "\xB0C",
    threshold: 75,
    message: "Top-oil temperature approaching upper warning limit; check cooling fan contactor.",
    status: "ACKNOWLEDGED",
    acknowledgedBy: "Chief Engineer Sharma"
  },
  {
    id: "ALT-1004",
    assetId: "TG-TX-102",
    timestamp: "1 hr ago",
    severity: "WARNING",
    parameter: "THD %",
    value: 5.4,
    unit: "%",
    threshold: 5,
    message: "Harmonic distortion exceeds IEEE 519 5% guideline due to nonlinear steel plant loads.",
    status: "ACTIVE"
  }
];
const INITIAL_WORK_ORDERS = [
  {
    id: "WO-2026-081",
    assetId: "TG-TX-103",
    title: "Emergency Radiator De-clogging & DGA Sampling",
    description: "Inspect radiator fins, test auxiliary fan relays, and draw oil sample for ASTM D3612 Dissolved Gas Analysis.",
    priority: "HIGH",
    status: "IN_PROGRESS",
    assignedTo: "Substation Maintenance Team A",
    dueDate: "2026-11-16",
    createdDate: "2026-11-15"
  },
  {
    id: "WO-2026-079",
    assetId: "TG-TX-102",
    title: "Harmonic Filter Inspection & Bushing Cleaning",
    description: "Verify 5th harmonic notch filter capacitor banks and perform thermographic sweep on primary bushings.",
    priority: "MEDIUM",
    status: "PENDING",
    assignedTo: "Power Quality Specialist R. Verma",
    dueDate: "2026-11-18",
    createdDate: "2026-11-14"
  },
  {
    id: "WO-2026-074",
    assetId: "TG-TX-101",
    title: "Quarterly Silica Gel Breather Replacement",
    description: "Routine desiccant replacement and dehydrating breather check.",
    priority: "LOW",
    status: "COMPLETED",
    assignedTo: "Technician K. Patel",
    dueDate: "2026-11-12",
    createdDate: "2026-11-08"
  }
];
const INITIAL_DEVICES = [
  {
    deviceId: "ESP32-NODE-01",
    assetId: "TG-TX-101",
    hardware: "ESP32-WROOM-32D",
    connectionType: "Wi-Fi 802.11 b/g/n (WPA2)",
    ipAddress: "192.168.1.101",
    macAddress: "24:6F:28:AB:11:42",
    rssi: -58,
    status: "ONLINE",
    firmwareVersion: "v2.4.1-transguard",
    uptimeSeconds: 842100,
    lastSeen: "Just now",
    sensorsConnected: ["PT100 (MAX31865)", "Current CT (SCT-013)", "ZMPT101B Voltage", "DHT22", "MPU6050"]
  },
  {
    deviceId: "ESP32-NODE-02",
    assetId: "TG-TX-102",
    hardware: "ESP32-S3-WROOM-1",
    connectionType: "4G LTE / GSM Cellular Gateway",
    ipAddress: "10.42.18.55",
    macAddress: "30:30:F9:C2:55:18",
    rssi: -72,
    status: "ONLINE",
    firmwareVersion: "v2.4.1-transguard",
    uptimeSeconds: 521400,
    lastSeen: "12s ago",
    sensorsConnected: ["Dual DS18B20", "Current CT 500A:5A", "Voltage Transducer", "MQ-2 Gas", "MPU6050"]
  },
  {
    deviceId: "ESP32-NODE-03",
    assetId: "TG-TX-103",
    hardware: "STM32F4 + ESP32 Bridge",
    connectionType: "Industrial RS-485 Modbus + Wi-Fi",
    ipAddress: "192.168.1.103",
    macAddress: "78:E3:6D:19:90:3A",
    rssi: -65,
    status: "ONLINE",
    firmwareVersion: "v2.3.8-modbus",
    uptimeSeconds: 120480,
    lastSeen: "Just now",
    sensorsConnected: ["Multi-channel RTD Pt100", "Rogowski Coil", "Vibration Accelerometer", "MQ-2 Gas"]
  },
  {
    deviceId: "TG-ESP32-USB-01",
    assetId: "TG-ESP32-LOCAL",
    hardware: "ESP32 DevKit V1 (USB-C)",
    connectionType: "USB Web Serial (115200 Baud) / Local HTTP",
    ipAddress: "127.0.0.1 (Local Serial)",
    macAddress: "A0:B7:65:04:1E:88",
    rssi: 0,
    status: "ONLINE",
    firmwareVersion: "v2.5.0-edge-bench",
    uptimeSeconds: 14200,
    lastSeen: "Streaming",
    sensorsConnected: ["DS18B20 Temp", "ACS712 5A Current", "ZMPT101B 250V AC", "MPU6050 Vib", "MQ-2 Gas", "DHT22"]
  }
];
const Sparkline = React.memo(function Sparkline2({
  data,
  color = "#10b981",
  w = 120,
  h = 32
}) {
  if (!data || data.length < 2) {
    return /* @__PURE__ */ React.createElement("div", { className: "h-8 flex items-center justify-center text-[10px] text-gray-400 font-mono" }, "Gathering...");
  }
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const points = data.map((val, idx) => {
    const x = idx / (data.length - 1) * w;
    const y = h - (val - min) / range * (h - 8) - 4;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
  const polylineStr = points.join(" ");
  const areaPoints = `${points[0]} ${polylineStr} ${w},${h} 0,${h}`;
  return /* @__PURE__ */ React.createElement("svg", { viewBox: `0 0 ${w} ${h}`, preserveAspectRatio: "none", className: "w-full h-8 overflow-visible" }, /* @__PURE__ */ React.createElement("defs", null, /* @__PURE__ */ React.createElement("linearGradient", { id: `grad-${color.replace("#", "")}`, x1: "0", y1: "0", x2: "0", y2: "1" }, /* @__PURE__ */ React.createElement("stop", { offset: "0%", stopColor: color, stopOpacity: "0.25" }), /* @__PURE__ */ React.createElement("stop", { offset: "100%", stopColor: color, stopOpacity: "0.0" }))), /* @__PURE__ */ React.createElement("polygon", { points: areaPoints, fill: `url(#grad-${color.replace("#", "")})` }), /* @__PURE__ */ React.createElement("polyline", { points: polylineStr, fill: "none", stroke: color, strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }));
});
const RollingLiveChart = React.memo(function RollingLiveChart2({
  series,
  sensorDef,
  scale,
  timeWindow,
  onWindowChange
}) {
  const [hoverIndex, setHoverIndex] = useState(null);
  const svgRef = useRef(null);
  const displayPoints = useMemo(() => {
    if (!series || !series.length) return [];
    if (timeWindow === "LIVE") return series.slice(-30);
    if (timeWindow === "1M") return series.slice(-60);
    if (timeWindow === "5M") return series.slice(-90);
    return series;
  }, [series, timeWindow]);
  const cfg = sensorDef[scale];
  const values = displayPoints.map((p) => p.v);
  const curVal = values.length ? values[values.length - 1] : cfg.base;
  const minVal = values.length ? Math.min(...values) : cfg.base;
  const maxVal = values.length ? Math.max(...values) : cfg.base;
  const avgVal = values.length ? values.reduce((a, b) => a + b, 0) / values.length : cfg.base;
  const yMin = Math.min(cfg.minAxis, minVal - (maxVal - minVal) * 0.1);
  const yMax = Math.max(cfg.maxAxis, maxVal + (maxVal - minVal) * 0.1, cfg.crit * 1.05);
  const yRange = yMax - yMin || 1;
  const chartW = 760;
  const chartH = 220;
  const padL = 45;
  const padR = 20;
  const padT = 20;
  const padB = 30;
  const innerW = chartW - padL - padR;
  const innerH = chartH - padT - padB;
  const coordPoints = displayPoints.map((pt, i) => {
    const x = padL + i / Math.max(1, displayPoints.length - 1) * innerW;
    const y = padT + innerH - (pt.v - yMin) / yRange * innerH;
    return { x, y, pt };
  });
  const polylineStr = coordPoints.map((c) => `${c.x.toFixed(1)},${c.y.toFixed(1)}`).join(" ");
  const areaPoints = coordPoints.length ? `${coordPoints[0].x},${padT + innerH} ` + polylineStr + ` ${coordPoints[coordPoints.length - 1].x},${padT + innerH}` : "";
  const warnY = padT + innerH - (cfg.warn - yMin) / yRange * innerH;
  const critY = padT + innerH - (cfg.crit - yMin) / yRange * innerH;
  const handlePointerMove = (e) => {
    if (!svgRef.current || !coordPoints.length) return;
    const rect = svgRef.current.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const svgX = clientX / rect.width * chartW;
    let closestIdx = 0;
    let minDiff = Infinity;
    coordPoints.forEach((c, idx) => {
      const diff = Math.abs(c.x - svgX);
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = idx;
      }
    });
    setHoverIndex(closestIdx);
  };
  const activePoint = hoverIndex !== null && coordPoints[hoverIndex] ? coordPoints[hoverIndex] : null;
  return /* @__PURE__ */ React.createElement("div", { className: "bg-white rounded-xl border border-slate-200 shadow-sm p-4 sm:p-5 space-y-3" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-slate-100" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React.createElement("div", { className: "p-2 rounded-lg bg-blue-50 text-blue-600" }, /* @__PURE__ */ React.createElement(sensorDef.icon, { className: "w-5 h-5" })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("h3", { className: "text-base font-bold text-slate-900" }, sensorDef.name), /* @__PURE__ */ React.createElement("span", { className: "text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold" }, sensorDef.ic)), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-slate-500 font-mono mt-0.5" }, "Live: ", /* @__PURE__ */ React.createElement("span", { className: "font-bold text-slate-900" }, curVal.toFixed(sensorDef.decimals), " ", sensorDef.unit), " \xB7 Min: ", minVal.toFixed(sensorDef.decimals), " \xB7 Max: ", maxVal.toFixed(sensorDef.decimals), " \xB7 Avg: ", avgVal.toFixed(sensorDef.decimals)))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1 bg-slate-100 p-1 rounded-lg self-start sm:self-auto text-xs font-mono font-semibold" }, ["LIVE", "1M", "5M", "15M"].map((w) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: w,
      onClick: () => onWindowChange(w),
      className: `px-2.5 py-1 rounded transition-colors ${timeWindow === w ? "bg-blue-600 text-white shadow-sm" : "text-slate-600 hover:text-slate-900"}`
    },
    w
  )))), /* @__PURE__ */ React.createElement("div", { className: "relative w-full overflow-hidden select-none" }, /* @__PURE__ */ React.createElement(
    "svg",
    {
      ref: svgRef,
      viewBox: `0 0 ${chartW} ${chartH}`,
      className: "w-full h-48 sm:h-56 cursor-crosshair touch-none",
      onPointerMove: handlePointerMove,
      onPointerLeave: () => setHoverIndex(null)
    },
    /* @__PURE__ */ React.createElement("defs", null, /* @__PURE__ */ React.createElement("linearGradient", { id: "areaGradient", x1: "0", y1: "0", x2: "0", y2: "1" }, /* @__PURE__ */ React.createElement("stop", { offset: "0%", stopColor: "#2563eb", stopOpacity: "0.25" }), /* @__PURE__ */ React.createElement("stop", { offset: "100%", stopColor: "#2563eb", stopOpacity: "0.0" }))),
    [0, 0.25, 0.5, 0.75, 1].map((pct, idx) => {
      const y = padT + innerH * (1 - pct);
      const val = yMin + yRange * pct;
      return /* @__PURE__ */ React.createElement("g", { key: idx }, /* @__PURE__ */ React.createElement("line", { x1: padL, y1: y, x2: chartW - padR, y2: y, stroke: "#e2e8f0", strokeDasharray: "3 3" }), /* @__PURE__ */ React.createElement("text", { x: padL - 8, y: y + 3, textAnchor: "end", className: "fill-slate-400 text-[10px] font-mono" }, val.toFixed(0)));
    }),
    warnY >= padT && warnY <= padT + innerH && /* @__PURE__ */ React.createElement("g", null, /* @__PURE__ */ React.createElement("line", { x1: padL, y1: warnY, x2: chartW - padR, y2: warnY, stroke: "#f59e0b", strokeWidth: "1.5", strokeDasharray: "4 2" }), /* @__PURE__ */ React.createElement("text", { x: chartW - padR - 4, y: warnY - 4, textAnchor: "end", className: "fill-amber-600 text-[9px] font-mono font-bold" }, "WARN ", cfg.warn)),
    critY >= padT && critY <= padT + innerH && /* @__PURE__ */ React.createElement("g", null, /* @__PURE__ */ React.createElement("line", { x1: padL, y1: critY, x2: chartW - padR, y2: critY, stroke: "#ef4444", strokeWidth: "1.5", strokeDasharray: "4 2" }), /* @__PURE__ */ React.createElement("text", { x: chartW - padR - 4, y: critY - 4, textAnchor: "end", className: "fill-red-600 text-[9px] font-mono font-bold" }, "CRIT ", cfg.crit)),
    areaPoints && /* @__PURE__ */ React.createElement("polygon", { points: areaPoints, fill: "url(#areaGradient)" }),
    polylineStr && /* @__PURE__ */ React.createElement("polyline", { points: polylineStr, fill: "none", stroke: "#2563eb", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round" }),
    activePoint && /* @__PURE__ */ React.createElement("g", null, /* @__PURE__ */ React.createElement("line", { x1: activePoint.x, y1: padT, x2: activePoint.x, y2: padT + innerH, stroke: "#0f172a", strokeWidth: "1.5", strokeDasharray: "2 2" }), /* @__PURE__ */ React.createElement("circle", { cx: activePoint.x, cy: activePoint.y, r: "5", fill: "#2563eb", stroke: "#ffffff", strokeWidth: "2" }), /* @__PURE__ */ React.createElement("rect", { x: Math.min(chartW - 120, Math.max(padL, activePoint.x - 55)), y: padT + 4, width: "110", height: "32", rx: "4", fill: "#0f172a", opacity: "0.9" }), /* @__PURE__ */ React.createElement("text", { x: Math.min(chartW - 120, Math.max(padL, activePoint.x - 55)) + 55, y: padT + 18, textAnchor: "middle", className: "fill-white text-[11px] font-mono font-bold" }, activePoint.pt.v.toFixed(sensorDef.decimals), " ", sensorDef.unit), /* @__PURE__ */ React.createElement("text", { x: Math.min(chartW - 120, Math.max(padL, activePoint.x - 55)) + 55, y: padT + 29, textAnchor: "middle", className: "fill-slate-300 text-[9px] font-mono" }, activePoint.pt.timeStr))
  )));
});
const TelemetryCard = React.memo(function TelemetryCard2({
  sensor,
  currentVal,
  history,
  scale,
  isSelected,
  onSelect
}) {
  const status = getSensorStatus(sensor.id, currentVal, scale);
  const cfg = sensor[scale];
  const numHistory = history.map((p) => p.v);
  const statusConfig = {
    NORMAL: { badge: "bg-emerald-50 text-emerald-700 border-emerald-200", dot: "bg-emerald-500", stroke: "#10b981" },
    WARNING: { badge: "bg-amber-50 text-amber-700 border-amber-200", dot: "bg-amber-500", stroke: "#f59e0b" },
    CRITICAL: { badge: "bg-red-50 text-red-700 border-red-200", dot: "bg-red-500", stroke: "#ef4444" }
  }[status];
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      onClick: onSelect,
      className: `p-3.5 sm:p-4 rounded-xl border transition-all cursor-pointer ${isSelected ? "bg-blue-50/50 border-blue-500 shadow-sm ring-2 ring-blue-500/20" : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm"}`
    },
    /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between gap-2 mb-2" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 truncate" }, /* @__PURE__ */ React.createElement("div", { className: `p-1.5 rounded-lg ${isSelected ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700"}` }, /* @__PURE__ */ React.createElement(sensor.icon, { className: "w-4 h-4" })), /* @__PURE__ */ React.createElement("span", { className: "text-xs font-bold text-slate-800 truncate" }, sensor.name)), /* @__PURE__ */ React.createElement("span", { className: `text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border flex items-center gap-1.5 ${statusConfig.badge}` }, /* @__PURE__ */ React.createElement("span", { className: `w-1.5 h-1.5 rounded-full ${statusConfig.dot}` }), status)),
    /* @__PURE__ */ React.createElement("div", { className: "flex items-baseline justify-between mb-2" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "text-2xl font-black font-mono tracking-tight text-slate-900" }, currentVal.toFixed(sensor.decimals)), /* @__PURE__ */ React.createElement("span", { className: "text-xs font-bold text-slate-500 ml-1" }, sensor.unit)), /* @__PURE__ */ React.createElement("span", { className: "text-[10px] font-mono text-slate-400" }, "Base: ", cfg.base, sensor.unit)),
    /* @__PURE__ */ React.createElement(Sparkline, { data: numHistory, color: statusConfig.stroke }),
    /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-center text-[10px] font-mono text-slate-400 pt-2 border-t border-slate-100 mt-2" }, /* @__PURE__ */ React.createElement("span", null, "Warn: ", cfg.warn, sensor.unit), /* @__PURE__ */ React.createElement("span", null, "Crit: ", cfg.crit, sensor.unit))
  );
});
function TransGuardApp() {
  const [activeModule, setActiveModule] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [fleet, setFleet] = useState(INITIAL_FLEET);
  const [selectedAssetId, setSelectedAssetId] = useState("TG-ESP32-LOCAL");
  const [inputSource, setInputSource] = useState("sim");
  const [hardwareScale, setHardwareScale] = useState("bench");
  const [simScenario, setSimScenario] = useState("normal");
  const [isPaused, setIsPaused] = useState(false);
  const [selectedSensorId, setSelectedSensorId] = useState("windingTemp");
  const [timeWindow, setTimeWindow] = useState("LIVE");
  const [history, setHistory] = useState(() => generateInitialHistory("bench"));
  const [packetCount, setPacketCount] = useState(0);
  const [rawLogs, setRawLogs] = useState([]);
  const [alerts, setAlerts] = useState(INITIAL_ALERTS);
  const [alertFilter, setAlertFilter] = useState("ALL");
  const [alertStatusFilter, setAlertStatusFilter] = useState("ALL");
  const [workOrders, setWorkOrders] = useState(INITIAL_WORK_ORDERS);
  const [workOrderFilter, setWorkOrderFilter] = useState("ALL");
  const [showNewWorkOrderModal, setShowNewWorkOrderModal] = useState(false);
  const [newOrderForm, setNewOrderForm] = useState({ assetId: "TG-TX-103", title: "", description: "", priority: "HIGH", assignedTo: "Maintenance Team" });
  const [devices, setDevices] = useState(INITIAL_DEVICES);
  const [usbConnected, setUsbConnected] = useState(false);
  const serialPortRef = useRef(null);
  const serialReaderRef = useRef(null);
  const [wifiUrl, setWifiUrl] = useState("http://localhost:3000/telemetry");
  const [wifiConnected, setWifiConnected] = useState(false);
  const wifiPollRef = useRef(null);
  const [showFirmwareModal, setShowFirmwareModal] = useState(false);
  const [showConsoleDrawer, setShowConsoleDrawer] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [resolveAlertTarget, setResolveAlertTarget] = useState(null);
  const [resolveNotes, setResolveNotes] = useState("");
  const [toast, setToast] = useState(null);
  const triggerToast = (msg, type = "info") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };
  const activeAsset = useMemo(() => {
    return fleet.find((a) => a.id === selectedAssetId) || fleet[0];
  }, [fleet, selectedAssetId]);
  const selectedSensor = useMemo(() => {
    return SENSOR_DEFINITIONS.find((s) => s.id === selectedSensorId) || SENSOR_DEFINITIONS[1];
  }, [selectedSensorId]);
  const aiHealth = useMemo(() => {
    return computeHealthMetrics(history, hardwareScale);
  }, [history, hardwareScale]);
  const ingestTelemetryPacket = useCallback(
    (payload, sourceLabel) => {
      const now = /* @__PURE__ */ new Date();
      const timeStr = now.toLocaleTimeString([], { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" });
      setHistory((prev) => {
        const next = {};
        SENSOR_DEFINITIONS.forEach((s) => {
          const prevArr = prev[s.id] || [];
          const lastVal = prevArr.length ? prevArr[prevArr.length - 1].v : s[hardwareScale].base;
          let raw = payload[s.id];
          if (raw === void 0 && s.id === "oilTemp") raw = payload.temp ?? payload.temperature;
          if (raw === void 0 && s.id === "vib") raw = payload.vibration;
          if (raw === void 0 && s.id === "gas") raw = payload.smoke ?? payload.ppm;
          const num = typeof raw === "number" && !Number.isNaN(raw) ? raw : lastVal;
          const rounded = Number(Math.max(0, num).toFixed(s.decimals));
          const updated = [...prevArr, { t: now, timeStr, v: rounded }];
          next[s.id] = updated.length > 120 ? updated.slice(-120) : updated;
        });
        return next;
      });
      setPacketCount((c) => c + 1);
      setRawLogs((prev) => [
        { id: String(Date.now()), time: timeStr, source: sourceLabel, raw: JSON.stringify(payload) },
        ...prev.slice(0, 49)
      ]);
    },
    [hardwareScale]
  );
  useEffect(() => {
    if (inputSource !== "sim" || isPaused) return;
    const interval = setInterval(() => {
      const now = Date.now();
      const tSec = now / 1e3;
      const simPacket = {};
      SENSOR_DEFINITIONS.forEach((s) => {
        const cfg = s[hardwareScale];
        let val = cfg.base;
        if (simScenario === "normal") {
          val += (Math.sin(tSec * 0.4) * 0.35 + (Math.random() - 0.5)) * cfg.noise;
        } else if (simScenario === "overload") {
          if (s.id === "current") val = cfg.warn * 1.08 + Math.random() * 0.15 * cfg.noise;
          else if (s.id === "windingTemp") val = cfg.warn * 1.04 + Math.sin(tSec * 0.2) * 1.2;
          else val += (Math.random() - 0.5) * cfg.noise;
        } else if (simScenario === "thermal") {
          if (s.id === "oilTemp") val = cfg.warn + 3.5 + Math.sin(tSec * 0.1) * 2;
          else if (s.id === "windingTemp") val = cfg.crit + 2 + Math.sin(tSec * 0.15) * 3;
          else val += (Math.random() - 0.5) * cfg.noise;
        } else if (simScenario === "harmonic") {
          if (s.id === "thd") val = cfg.warn * 1.25 + Math.random() * 0.5;
          else if (s.id === "vib") val = cfg.warn * 1.1 + Math.random() * 0.2;
          else val += (Math.random() - 0.5) * cfg.noise;
        }
        simPacket[s.id] = Number(Math.max(0, val).toFixed(s.decimals));
      });
      ingestTelemetryPacket(simPacket, "SIMULATOR-STREAM");
    }, 1e3);
    return () => clearInterval(interval);
  }, [inputSource, isPaused, hardwareScale, simScenario, ingestTelemetryPacket]);
  const connectUsbSerial = async () => {
    if (!("serial" in navigator)) {
      triggerToast("Web Serial API requires Chrome, Edge, or Brave on Desktop/Android.", "error");
      return;
    }
    try {
      const port = await navigator.serial.requestPort();
      await port.open({ baudRate: 115200 });
      serialPortRef.current = port;
      setUsbConnected(true);
      setInputSource("usb");
      triggerToast("Connected to ESP32 via USB Serial (115200 baud)", "success");
      const textDecoder = new TextDecoderStream();
      port.readable.pipeTo(textDecoder.writable);
      const reader = textDecoder.readable.getReader();
      serialReaderRef.current = reader;
      let buffer = "";
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        if (value) {
          buffer += value;
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";
          for (const line of lines) {
            const trimmed = line.trim();
            if (trimmed.startsWith("{")) {
              try {
                const parsed = JSON.parse(trimmed);
                ingestTelemetryPacket(parsed, "ESP32-USB");
              } catch (_) {
              }
            }
          }
        }
      }
    } catch (err) {
      triggerToast(`USB Serial connection closed: ${err.message}`, "info");
      setUsbConnected(false);
    }
  };
  const disconnectUsbSerial = async () => {
    try {
      if (serialReaderRef.current) await serialReaderRef.current.cancel();
      if (serialPortRef.current) await serialPortRef.current.close();
    } catch (_) {
    }
    setUsbConnected(false);
    triggerToast("Disconnected from USB Serial", "info");
  };
  const toggleWifiPolling = () => {
    if (wifiConnected) {
      if (wifiPollRef.current) clearInterval(wifiPollRef.current);
      setWifiConnected(false);
      triggerToast("Stopped Wi-Fi telemetry polling", "info");
    } else {
      setWifiConnected(true);
      setInputSource("wifi");
      triggerToast(`Polling live telemetry from ${wifiUrl}`, "success");
      const poll = async () => {
        try {
          const res = await fetch(wifiUrl);
          if (res.ok) {
            const json = await res.json();
            ingestTelemetryPacket(json, "ESP32-WIFI");
          }
        } catch (_) {
        }
      };
      poll();
      wifiPollRef.current = setInterval(poll, 1e3);
    }
  };
  useEffect(() => {
    return () => {
      if (wifiPollRef.current) clearInterval(wifiPollRef.current);
    };
  }, []);
  useEffect(() => {
    fetch("/api/fleet").then((res) => res.json()).then((data) => {
      if (data.assets) setFleet(data.assets);
    }).catch(() => {
    });
  }, []);
  const handleAcknowledgeAlert = (id) => {
    setAlerts(
      (prev) => prev.map((a) => a.id === id ? { ...a, status: "ACKNOWLEDGED", acknowledgedBy: "User (Control Room)" } : a)
    );
    fetch(`/api/alerts/${id}/acknowledge`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: "User (Control Room)" })
    }).catch(() => {
    });
    triggerToast(`Alert ${id} acknowledged.`, "success");
  };
  const handleResolveAlert = () => {
    if (!resolveAlertTarget) return;
    const id = resolveAlertTarget.id;
    setAlerts(
      (prev) => prev.map((a) => a.id === id ? { ...a, status: "RESOLVED", resolvedNotes: resolveNotes || "Normal operating parameters confirmed." } : a)
    );
    fetch(`/api/alerts/${id}/resolve`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notes: resolveNotes })
    }).catch(() => {
    });
    triggerToast(`Alert ${id} resolved.`, "success");
    setResolveAlertTarget(null);
    setResolveNotes("");
  };
  const handleCreateWorkOrder = (e) => {
    e.preventDefault();
    if (!newOrderForm.title) return;
    const newWo = {
      id: `WO-2026-${String(workOrders.length + 101).padStart(3, "0")}`,
      assetId: newOrderForm.assetId,
      title: newOrderForm.title,
      description: newOrderForm.description,
      priority: newOrderForm.priority,
      status: "PENDING",
      assignedTo: newOrderForm.assignedTo,
      dueDate: new Date(Date.now() + 7 * 864e5).toISOString().split("T")[0],
      createdDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
    };
    setWorkOrders([newWo, ...workOrders]);
    setShowNewWorkOrderModal(false);
    setNewOrderForm({ assetId: "TG-TX-103", title: "", description: "", priority: "HIGH", assignedTo: "Maintenance Team" });
    triggerToast(`Created Work Order ${newWo.id}`, "success");
  };
  const handleUpdateWoStatus = (id, nextStatus) => {
    setWorkOrders((prev) => prev.map((w) => w.id === id ? { ...w, status: nextStatus } : w));
    triggerToast(`Work Order ${id} updated to ${nextStatus}`, "info");
  };
  const downloadCsvReport = () => {
    let csv = "Time,Oil Temp (\xB0C),Winding Temp (\xB0C),Current (A),Voltage (V),Vibration (mm/s),THD (%),Gas (ppm),Ambient (\xB0C)\n";
    const len = history.oilTemp ? history.oilTemp.length : 0;
    for (let i = 0; i < len; i++) {
      const t = history.oilTemp[i]?.timeStr || "";
      csv += `${t},${history.oilTemp[i]?.v ?? ""},${history.windingTemp[i]?.v ?? ""},${history.current[i]?.v ?? ""},${history.voltage[i]?.v ?? ""},${history.vib[i]?.v ?? ""},${history.thd[i]?.v ?? ""},${history.gas[i]?.v ?? ""},${history.ambient[i]?.v ?? ""}
`;
    }
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `transguard_telemetry_${selectedAssetId}_${Date.now()}.csv`;
    link.click();
    triggerToast("Exported telemetry log to CSV", "success");
  };
  return /* @__PURE__ */ React.createElement("div", { className: "min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col antialiased" }, toast && /* @__PURE__ */ React.createElement("div", { className: "fixed bottom-5 right-5 z-50 px-4 py-2.5 rounded-lg shadow-xl bg-slate-900 text-white text-xs font-mono flex items-center gap-2 border border-slate-700 animate-slide-up" }, /* @__PURE__ */ React.createElement("span", { className: `w-2 h-2 rounded-full ${toast.type === "error" ? "bg-red-500" : toast.type === "success" ? "bg-emerald-400" : "bg-blue-400"}` }), /* @__PURE__ */ React.createElement("span", null, toast.msg)), /* @__PURE__ */ React.createElement("header", { className: "sticky top-0 z-40 bg-slate-900 border-b border-slate-800 text-white px-4 py-2.5 flex items-center justify-between shadow-md" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setSidebarOpen(!sidebarOpen),
      className: "lg:hidden p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
    },
    /* @__PURE__ */ React.createElement(Sliders, { className: "w-5 h-5" })
  ), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2.5" }, /* @__PURE__ */ React.createElement("div", { className: "w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm" }, /* @__PURE__ */ React.createElement(Shield, { className: "w-5 h-5" })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1.5" }, /* @__PURE__ */ React.createElement("span", { className: "font-black text-sm tracking-wider" }, "TRANSGUARD"), /* @__PURE__ */ React.createElement("span", { className: "text-[10px] font-mono px-1.5 py-0.2 rounded bg-blue-500/20 text-blue-400 font-bold border border-blue-500/30" }, "AI")), /* @__PURE__ */ React.createElement("p", { className: "text-[10px] text-slate-400 hidden sm:block" }, "Industrial Transformer Predictive Maintenance")))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 sm:gap-3" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700 text-xs" }, /* @__PURE__ */ React.createElement(HardDrive, { className: "w-3.5 h-3.5 text-blue-400" }), /* @__PURE__ */ React.createElement(
    "select",
    {
      value: selectedAssetId,
      onChange: (e) => {
        setSelectedAssetId(e.target.value);
        setHardwareScale(e.target.value === "TG-ESP32-LOCAL" ? "bench" : "field");
      },
      className: "bg-transparent text-white font-mono text-xs focus:outline-none cursor-pointer"
    },
    fleet.map((a) => /* @__PURE__ */ React.createElement("option", { key: a.id, value: a.id, className: "bg-slate-900 text-white" }, a.id, " \u2014 ", a.name.slice(0, 22), " (", a.status, ")"))
  )), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setHardwareScale(hardwareScale === "bench" ? "field" : "bench"),
      className: `hidden md:flex items-center gap-1 text-[11px] font-mono font-bold px-2 py-1 rounded-md border ${hardwareScale === "bench" ? "bg-amber-500/10 border-amber-500/30 text-amber-300" : "bg-blue-500/10 border-blue-500/30 text-blue-300"}`
    },
    /* @__PURE__ */ React.createElement("span", null, hardwareScale === "bench" ? "BENCHTOP 24V" : "GRID 11kV")
  ), /* @__PURE__ */ React.createElement("div", { className: "hidden sm:flex items-center gap-1.5 text-[11px] font-mono px-2 py-1 rounded-md bg-slate-800 border border-slate-700 text-slate-300" }, /* @__PURE__ */ React.createElement("span", { className: `w-2 h-2 rounded-full ${inputSource === "sim" ? "bg-amber-400 animate-pulse" : "bg-emerald-400"}` }), /* @__PURE__ */ React.createElement("span", null, inputSource.toUpperCase())), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setShowFirmwareModal(true),
      className: "p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white",
      title: "ESP32 C++ Firmware Sketch"
    },
    /* @__PURE__ */ React.createElement(Code2, { className: "w-4 h-4" })
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setShowConsoleDrawer(true),
      className: "relative p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white",
      title: "Telemetry Console & Logs"
    },
    /* @__PURE__ */ React.createElement(Terminal, { className: "w-4 h-4" }),
    alerts.filter((a) => a.status === "ACTIVE").length > 0 && /* @__PURE__ */ React.createElement("span", { className: "absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 animate-ping" })
  ))), /* @__PURE__ */ React.createElement("div", { className: "flex-1 flex overflow-hidden" }, /* @__PURE__ */ React.createElement(
    "aside",
    {
      className: `fixed inset-y-0 left-0 z-30 w-64 bg-slate-900 border-r border-slate-800 text-slate-300 flex flex-col transition-transform transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:relative lg:translate-x-0 pt-16 lg:pt-0`
    },
    /* @__PURE__ */ React.createElement("div", { className: "p-4 border-b border-slate-800" }, /* @__PURE__ */ React.createElement("div", { className: "text-[11px] font-mono text-slate-500 uppercase tracking-wider font-semibold" }, "Fleet Operations"), /* @__PURE__ */ React.createElement("div", { className: "text-xs text-slate-300 mt-1 font-medium truncate" }, activeAsset.name)),
    /* @__PURE__ */ React.createElement("nav", { className: "flex-1 px-3 py-4 space-y-1 overflow-y-auto" }, [
      { id: "overview", label: "Fleet Overview", icon: Layers },
      { id: "monitoring", label: "Live Telemetry", icon: Activity },
      { id: "analytics", label: "AI Health Assessment", icon: Zap },
      { id: "alerts", label: "Alerts & Incidents", icon: AlertTriangle, count: alerts.filter((a) => a.status === "ACTIVE").length },
      { id: "maintenance", label: "Predictive Work Orders", icon: Wrench, count: workOrders.filter((w) => w.status !== "COMPLETED").length },
      { id: "assets", label: "Transformer Registry", icon: HardDrive },
      { id: "reports", label: "Reports & Analytics", icon: FileText },
      { id: "devices", label: "IoT Gateways", icon: Server, count: devices.length }
    ].map((item) => {
      const active = activeModule === item.id;
      return /* @__PURE__ */ React.createElement(
        "button",
        {
          key: item.id,
          onClick: () => {
            setActiveModule(item.id);
            setSidebarOpen(false);
          },
          className: `w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${active ? "bg-blue-600 text-white shadow-sm font-semibold" : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"}`
        },
        /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React.createElement(item.icon, { className: `w-4 h-4 ${active ? "text-white" : "text-slate-400"}` }), /* @__PURE__ */ React.createElement("span", null, item.label)),
        item.count !== void 0 && item.count > 0 && /* @__PURE__ */ React.createElement("span", { className: `text-[10px] font-mono px-1.5 py-0.2 rounded-full font-bold ${active ? "bg-white text-blue-600" : "bg-slate-800 text-slate-300 border border-slate-700"}` }, item.count)
      );
    })),
    /* @__PURE__ */ React.createElement("div", { className: "p-4 border-t border-slate-800 bg-slate-950/40 text-[11px] font-mono text-slate-400" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("span", null, "Backend Server:"), /* @__PURE__ */ React.createElement("span", { className: "text-emerald-400 flex items-center gap-1 font-bold" }, /* @__PURE__ */ React.createElement("span", { className: "w-1.5 h-1.5 rounded-full bg-emerald-400" }), " ONLINE")), /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mt-1 text-slate-500 text-[10px]" }, /* @__PURE__ */ React.createElement("span", null, "Ingested Frames:"), /* @__PURE__ */ React.createElement("span", null, packetCount)))
  ), sidebarOpen && /* @__PURE__ */ React.createElement("div", { onClick: () => setSidebarOpen(false), className: "fixed inset-0 z-20 bg-slate-950/60 lg:hidden" }), /* @__PURE__ */ React.createElement("main", { className: "flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6" }, activeModule === "overview" && /* @__PURE__ */ React.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", { className: "text-xl sm:text-2xl font-black text-slate-900 tracking-tight" }, "Distribution Fleet Overview"), /* @__PURE__ */ React.createElement("p", { className: "text-xs sm:text-sm text-slate-500 mt-1" }, "Fleet-wide health telemetry, operational metrics, and proactive maintenance priorities.")), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4" }, /* @__PURE__ */ React.createElement("div", { className: "bg-white p-4 rounded-xl border border-slate-200 shadow-sm" }, /* @__PURE__ */ React.createElement("span", { className: "text-xs font-semibold text-slate-500" }, "Total Fleet Assets"), /* @__PURE__ */ React.createElement("div", { className: "text-2xl font-black font-mono text-slate-900 mt-1" }, fleet.length), /* @__PURE__ */ React.createElement("span", { className: "text-[10px] text-slate-400" }, "Distribution Units")), /* @__PURE__ */ React.createElement("div", { className: "bg-white p-4 rounded-xl border border-slate-200 shadow-sm" }, /* @__PURE__ */ React.createElement("span", { className: "text-xs font-semibold text-slate-500" }, "Fleet Health Index"), /* @__PURE__ */ React.createElement("div", { className: "text-2xl font-black font-mono text-blue-600 mt-1" }, "73.8%"), /* @__PURE__ */ React.createElement("span", { className: "text-[10px] text-emerald-600 font-medium" }, "Optimal Margin")), /* @__PURE__ */ React.createElement("div", { className: "bg-white p-4 rounded-xl border border-slate-200 shadow-sm" }, /* @__PURE__ */ React.createElement("span", { className: "text-xs font-semibold text-slate-500" }, "Healthy (Normal)"), /* @__PURE__ */ React.createElement("div", { className: "text-2xl font-black font-mono text-emerald-600 mt-1" }, fleet.filter((a) => a.status === "NORMAL").length), /* @__PURE__ */ React.createElement("span", { className: "text-[10px] text-slate-400" }, "Operating safely")), /* @__PURE__ */ React.createElement("div", { className: "bg-white p-4 rounded-xl border border-slate-200 shadow-sm" }, /* @__PURE__ */ React.createElement("span", { className: "text-xs font-semibold text-slate-500" }, "Watch / Warning"), /* @__PURE__ */ React.createElement("div", { className: "text-2xl font-black font-mono text-amber-600 mt-1" }, fleet.filter((a) => a.status === "WARNING").length), /* @__PURE__ */ React.createElement("span", { className: "text-[10px] text-amber-600 font-medium" }, "Elevated risk")), /* @__PURE__ */ React.createElement("div", { className: "bg-white p-4 rounded-xl border border-slate-200 shadow-sm" }, /* @__PURE__ */ React.createElement("span", { className: "text-xs font-semibold text-slate-500" }, "Critical Alarms"), /* @__PURE__ */ React.createElement("div", { className: "text-2xl font-black font-mono text-red-600 mt-1" }, alerts.filter((a) => a.severity === "CRITICAL" && a.status === "ACTIVE").length), /* @__PURE__ */ React.createElement("span", { className: "text-[10px] text-red-600 font-medium" }, "Immediate action")), /* @__PURE__ */ React.createElement("div", { className: "bg-white p-4 rounded-xl border border-slate-200 shadow-sm" }, /* @__PURE__ */ React.createElement("span", { className: "text-xs font-semibold text-slate-500" }, "IoT Gateways"), /* @__PURE__ */ React.createElement("div", { className: "text-2xl font-black font-mono text-slate-900 mt-1" }, devices.length), /* @__PURE__ */ React.createElement("span", { className: "text-[10px] text-emerald-600 font-medium" }, "All nodes online"))), /* @__PURE__ */ React.createElement("div", { className: "bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: "p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h2", { className: "text-base font-bold text-slate-900" }, "Distribution Transformers Fleet Registry"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-slate-500" }, "Real-time status across active substations")), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setActiveModule("assets"),
      className: "text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
    },
    /* @__PURE__ */ React.createElement("span", null, "Full Registry"),
    /* @__PURE__ */ React.createElement(ChevronRight, { className: "w-4 h-4" })
  )), /* @__PURE__ */ React.createElement("div", { className: "overflow-x-auto" }, /* @__PURE__ */ React.createElement("table", { className: "w-full text-left border-collapse text-xs" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", { className: "bg-slate-50 text-slate-500 font-mono text-[11px] border-b border-slate-200" }, /* @__PURE__ */ React.createElement("th", { className: "p-3.5 font-semibold" }, "TRANSFORMER ID"), /* @__PURE__ */ React.createElement("th", { className: "p-3.5 font-semibold" }, "SUBSTATION LOCATION"), /* @__PURE__ */ React.createElement("th", { className: "p-3.5 font-semibold" }, "RATING"), /* @__PURE__ */ React.createElement("th", { className: "p-3.5 font-semibold" }, "HEALTH INDEX"), /* @__PURE__ */ React.createElement("th", { className: "p-3.5 font-semibold" }, "EST. RUL"), /* @__PURE__ */ React.createElement("th", { className: "p-3.5 font-semibold" }, "STATUS"), /* @__PURE__ */ React.createElement("th", { className: "p-3.5 font-semibold text-right" }, "ACTION"))), /* @__PURE__ */ React.createElement("tbody", { className: "divide-y divide-slate-100" }, fleet.map((a) => /* @__PURE__ */ React.createElement("tr", { key: a.id, className: "hover:bg-slate-50/80 transition-colors" }, /* @__PURE__ */ React.createElement("td", { className: "p-3.5 font-mono font-bold text-slate-900" }, a.id, /* @__PURE__ */ React.createElement("span", { className: "block text-[10px] text-slate-400 font-sans font-normal" }, a.serialNumber)), /* @__PURE__ */ React.createElement("td", { className: "p-3.5 font-medium text-slate-700" }, a.location), /* @__PURE__ */ React.createElement("td", { className: "p-3.5 font-mono text-slate-600" }, a.capacityKva, " kVA \xB7 ", a.voltageRating), /* @__PURE__ */ React.createElement("td", { className: "p-3.5" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("span", { className: "font-mono font-bold text-slate-900" }, a.healthIndex, "%"), /* @__PURE__ */ React.createElement("div", { className: "w-16 h-2 bg-slate-100 rounded-full overflow-hidden" }, /* @__PURE__ */ React.createElement(
    "div",
    {
      className: `h-full rounded-full ${a.healthIndex >= 80 ? "bg-emerald-500" : a.healthIndex >= 60 ? "bg-amber-500" : "bg-red-500"}`,
      style: { width: `${a.healthIndex}%` }
    }
  )))), /* @__PURE__ */ React.createElement("td", { className: "p-3.5 font-mono text-slate-700 font-medium" }, a.rulYears, " Years"), /* @__PURE__ */ React.createElement("td", { className: "p-3.5" }, /* @__PURE__ */ React.createElement("span", { className: `inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold ${a.status === "NORMAL" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : a.status === "WARNING" ? "bg-amber-50 text-amber-700 border border-amber-200" : "bg-red-50 text-red-700 border border-red-200"}` }, /* @__PURE__ */ React.createElement("span", { className: `w-1.5 h-1.5 rounded-full ${a.status === "NORMAL" ? "bg-emerald-500" : a.status === "WARNING" ? "bg-amber-500" : "bg-red-500"}` }), a.status)), /* @__PURE__ */ React.createElement("td", { className: "p-3.5 text-right" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => {
        setSelectedAssetId(a.id);
        setHardwareScale(a.id === "TG-ESP32-LOCAL" ? "bench" : "field");
        setActiveModule("monitoring");
      },
      className: "px-3 py-1 bg-slate-100 hover:bg-blue-600 hover:text-white rounded-md font-mono text-xs font-semibold text-slate-700 transition-colors"
    },
    "Inspect Telemetry"
  ))))))))), activeModule === "monitoring" && /* @__PURE__ */ React.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-sm" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("span", { className: "text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200" }, activeAsset.id), /* @__PURE__ */ React.createElement("h2", { className: "text-base sm:text-lg font-black text-slate-900" }, activeAsset.name)), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-slate-500 mt-0.5" }, activeAsset.location, " \xB7 ", activeAsset.capacityKva, " kVA \xB7 ", activeAsset.coolingType)), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap items-center gap-2" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center bg-slate-100 p-1 rounded-lg text-xs font-mono font-bold" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setInputSource("sim"),
      className: `px-3 py-1 rounded transition-colors ${inputSource === "sim" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"}`
    },
    "SIMULATOR"
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: usbConnected ? disconnectUsbSerial : connectUsbSerial,
      className: `px-3 py-1 rounded transition-colors flex items-center gap-1 ${usbConnected ? "bg-emerald-600 text-white shadow-sm" : "text-slate-500 hover:text-slate-900"}`
    },
    /* @__PURE__ */ React.createElement(Usb, { className: "w-3 h-3" }),
    /* @__PURE__ */ React.createElement("span", null, usbConnected ? "USB LIVE" : "USB SERIAL")
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: toggleWifiPolling,
      className: `px-3 py-1 rounded transition-colors flex items-center gap-1 ${wifiConnected ? "bg-emerald-600 text-white shadow-sm" : "text-slate-500 hover:text-slate-900"}`
    },
    /* @__PURE__ */ React.createElement(Wifi, { className: "w-3 h-3" }),
    /* @__PURE__ */ React.createElement("span", null, wifiConnected ? "WI-FI LIVE" : "WI-FI")
  )), inputSource === "sim" && /* @__PURE__ */ React.createElement(
    "select",
    {
      value: simScenario,
      onChange: (e) => setSimScenario(e.target.value),
      className: "bg-amber-50 border border-amber-300 text-amber-900 text-xs font-mono font-bold px-2.5 py-1 rounded-lg focus:outline-none cursor-pointer"
    },
    /* @__PURE__ */ React.createElement("option", { value: "normal" }, "Scenario: Normal Baseline"),
    /* @__PURE__ */ React.createElement("option", { value: "overload" }, "Scenario: Peak Overload Surge"),
    /* @__PURE__ */ React.createElement("option", { value: "thermal" }, "Scenario: Thermal Runaway Fault"),
    /* @__PURE__ */ React.createElement("option", { value: "harmonic" }, "Scenario: Harmonic Resonance")
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setIsPaused(!isPaused),
      className: "p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100",
      title: isPaused ? "Resume Streaming" : "Pause Streaming"
    },
    isPaused ? /* @__PURE__ */ React.createElement(Play, { className: "w-4 h-4 text-emerald-600" }) : /* @__PURE__ */ React.createElement(Pause, { className: "w-4 h-4 text-amber-600" })
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: downloadCsvReport,
      className: "flex items-center gap-1 text-xs font-bold font-mono px-3 py-1.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800"
    },
    /* @__PURE__ */ React.createElement(Download, { className: "w-3.5 h-3.5" }),
    /* @__PURE__ */ React.createElement("span", null, "CSV")
  ))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4" }, SENSOR_DEFINITIONS.map((sensor) => {
    const series = history[sensor.id] || [];
    const latestVal = series.length ? series[series.length - 1].v : sensor[hardwareScale].base;
    return /* @__PURE__ */ React.createElement(
      TelemetryCard,
      {
        key: sensor.id,
        sensor,
        currentVal: latestVal,
        history: series,
        scale: hardwareScale,
        isSelected: selectedSensorId === sensor.id,
        onSelect: () => setSelectedSensorId(sensor.id)
      }
    );
  })), /* @__PURE__ */ React.createElement(
    RollingLiveChart,
    {
      series: history[selectedSensorId] || [],
      sensorDef: selectedSensor,
      scale: hardwareScale,
      timeWindow,
      onWindowChange: setTimeWindow
    }
  )), activeModule === "analytics" && /* @__PURE__ */ React.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", { className: "text-xl sm:text-2xl font-black text-slate-900 tracking-tight" }, "AI Health Assessment & Diagnostics"), /* @__PURE__ */ React.createElement("p", { className: "text-xs sm:text-sm text-slate-500 mt-1" }, "IEEE C57.91 thermal aging model, anomaly scoring, and automated failure mode classification.")), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4" }, /* @__PURE__ */ React.createElement("div", { className: "bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("span", { className: "text-xs font-bold text-slate-500 uppercase tracking-wider" }, "Health Index"), /* @__PURE__ */ React.createElement("span", { className: `text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${aiHealth.healthIndex >= 80 ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}` }, aiHealth.healthIndex >= 80 ? "OPTIMAL" : "MODERATE")), /* @__PURE__ */ React.createElement("div", { className: "flex items-baseline gap-2" }, /* @__PURE__ */ React.createElement("span", { className: "text-4xl font-black font-mono text-slate-900" }, aiHealth.healthIndex), /* @__PURE__ */ React.createElement("span", { className: "text-sm text-slate-400 font-mono" }, "/ 100")), /* @__PURE__ */ React.createElement("div", { className: "w-full bg-slate-100 h-2.5 rounded-full overflow-hidden" }, /* @__PURE__ */ React.createElement(
    "div",
    {
      className: `h-full rounded-full transition-all duration-500 ${aiHealth.healthIndex >= 80 ? "bg-emerald-500" : aiHealth.healthIndex >= 60 ? "bg-amber-500" : "bg-red-500"}`,
      style: { width: `${aiHealth.healthIndex}%` }
    }
  )), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-slate-500" }, "Weighted multi-factor score: Solid Insulation (28%), Liquid Dielectric (24%), Power Quality (18%), Mechanical (16%), Load Margin (14%).")), /* @__PURE__ */ React.createElement("div", { className: "bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("span", { className: "text-xs font-bold text-slate-500 uppercase tracking-wider" }, "Remaining Useful Life (RUL)"), /* @__PURE__ */ React.createElement("span", { className: "text-[10px] font-mono bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-bold" }, "IEEE C57.91")), /* @__PURE__ */ React.createElement("div", { className: "flex items-baseline gap-2" }, /* @__PURE__ */ React.createElement("span", { className: "text-4xl font-black font-mono text-blue-600" }, aiHealth.rulYears), /* @__PURE__ */ React.createElement("span", { className: "text-sm text-slate-500 font-bold" }, "Years"), /* @__PURE__ */ React.createElement("span", { className: "text-xs text-slate-400 font-mono" }, "(", aiHealth.rulPct, "% life remaining)")), /* @__PURE__ */ React.createElement("div", { className: "text-xs font-mono text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100" }, /* @__PURE__ */ React.createElement("div", null, "Aging Factor (F_AA): ", /* @__PURE__ */ React.createElement("span", { className: "font-bold text-slate-900" }, aiHealth.faa.toFixed(2), "x"), " baseline"), /* @__PURE__ */ React.createElement("div", null, "Hotspot: ", /* @__PURE__ */ React.createElement("span", { className: "font-bold text-slate-900" }, aiHealth.latest.windingTemp.toFixed(1), "\xB0C"))), /* @__PURE__ */ React.createElement("p", { className: "text-[11px] text-slate-400 italic" }, "Calculated using standard Arrhenius insulation loss rate equations.")), /* @__PURE__ */ React.createElement("div", { className: "bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2.5" }, /* @__PURE__ */ React.createElement("span", { className: "text-xs font-bold text-slate-500 uppercase tracking-wider" }, "Subsystem Health Breakdown"), [
    { label: "Winding Solid Insulation", val: aiHealth.windingScore },
    { label: "Dielectric Liquid & Cooling", val: aiHealth.oilScore },
    { label: "Power Quality & THD", val: aiHealth.pqScore },
    { label: "Mechanical Core Clamping", val: aiHealth.mechScore }
  ].map((s, idx) => /* @__PURE__ */ React.createElement("div", { key: idx, className: "space-y-1" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between text-xs font-medium" }, /* @__PURE__ */ React.createElement("span", { className: "text-slate-600" }, s.label), /* @__PURE__ */ React.createElement("span", { className: "font-mono font-bold text-slate-900" }, s.val, "/100")), /* @__PURE__ */ React.createElement("div", { className: "w-full bg-slate-100 h-1.5 rounded-full overflow-hidden" }, /* @__PURE__ */ React.createElement(
    "div",
    {
      className: `h-full rounded-full ${s.val >= 80 ? "bg-emerald-500" : s.val >= 60 ? "bg-amber-500" : "bg-red-500"}`,
      style: { width: `${s.val}%` }
    }
  )))))), /* @__PURE__ */ React.createElement("div", { className: "bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { className: "text-base font-bold text-slate-900" }, "Statistical Anomaly Detection"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-slate-500" }, "Real-time Z-score deviation against historical operating baselines")), /* @__PURE__ */ React.createElement("span", { className: "text-xs font-mono font-bold px-2 py-1 rounded bg-slate-100 text-slate-700" }, aiHealth.anomalies.length, " Anomalies Flagged")), aiHealth.anomalies.length === 0 ? /* @__PURE__ */ React.createElement("div", { className: "p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-mono text-emerald-800 flex items-center gap-2" }, /* @__PURE__ */ React.createElement(CheckCircle2, { className: "w-4 h-4 text-emerald-600" }), /* @__PURE__ */ React.createElement("span", null, "All 8 monitored parameters are within nominal statistical variance.")) : /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3" }, aiHealth.anomalies.map((an, idx) => /* @__PURE__ */ React.createElement("div", { key: idx, className: "p-3.5 rounded-lg border border-amber-200 bg-amber-50/50 text-xs space-y-1" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-center font-bold" }, /* @__PURE__ */ React.createElement("span", { className: "text-amber-900" }, an.parameter), /* @__PURE__ */ React.createElement("span", { className: "font-mono text-[10px] px-2 py-0.5 rounded bg-amber-200 text-amber-900" }, "+", an.deviationPct, "% Deviation")), /* @__PURE__ */ React.createElement("p", { className: "text-slate-600" }, an.description))))), /* @__PURE__ */ React.createElement("div", { className: "bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4" }, /* @__PURE__ */ React.createElement("h3", { className: "text-base font-bold text-slate-900" }, "AI Diagnostic Prescriptions & Action Plan"), aiHealth.detectedFaults.length === 0 ? /* @__PURE__ */ React.createElement("div", { className: "p-4 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center gap-2" }, /* @__PURE__ */ React.createElement(Check, { className: "w-4 h-4 text-emerald-600" }), /* @__PURE__ */ React.createElement("span", null, "Transformer is operating in healthy equilibrium. Continue regular scheduled visual inspection.")) : /* @__PURE__ */ React.createElement("div", { className: "space-y-3" }, aiHealth.detectedFaults.map((flt, idx) => /* @__PURE__ */ React.createElement("div", { key: idx, className: "p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("span", { className: "p-1.5 rounded-md bg-red-100 text-red-700" }, /* @__PURE__ */ React.createElement(AlertTriangle, { className: "w-4 h-4" })), /* @__PURE__ */ React.createElement("span", { className: "font-bold text-slate-900 text-sm" }, flt.fault)), /* @__PURE__ */ React.createElement("span", { className: "text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800" }, "Confidence: ", flt.confidence.toFixed(0), "%")), /* @__PURE__ */ React.createElement("div", { className: "text-xs text-slate-600" }, /* @__PURE__ */ React.createElement("span", { className: "font-semibold text-slate-700" }, "Risk Profile: "), flt.risk), /* @__PURE__ */ React.createElement("div", { className: "text-xs text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200 flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "font-bold text-blue-700 font-mono" }, "ACTION: "), /* @__PURE__ */ React.createElement("span", null, flt.action)), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => {
        setNewOrderForm({
          assetId: selectedAssetId,
          title: flt.fault,
          description: flt.action,
          priority: "HIGH",
          assignedTo: "Substation Electrical Lead"
        });
        setShowNewWorkOrderModal(true);
      },
      className: "px-2.5 py-1 bg-blue-600 text-white font-mono text-[11px] font-bold rounded hover:bg-blue-700 ml-3 shrink-0"
    },
    "Create Work Order"
  ))))))), activeModule === "alerts" && /* @__PURE__ */ React.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", { className: "text-xl sm:text-2xl font-black text-slate-900 tracking-tight" }, "Alerts & Incidents Management"), /* @__PURE__ */ React.createElement("p", { className: "text-xs sm:text-sm text-slate-500 mt-1" }, "Centralized audit trail for threshold violations, operator acknowledgments, and resolution notes.")), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement(
    "select",
    {
      value: alertFilter,
      onChange: (e) => setAlertFilter(e.target.value),
      className: "bg-white border border-slate-300 text-slate-700 text-xs font-mono font-bold px-3 py-1.5 rounded-lg focus:outline-none"
    },
    /* @__PURE__ */ React.createElement("option", { value: "ALL" }, "Severity: All"),
    /* @__PURE__ */ React.createElement("option", { value: "CRITICAL" }, "Severity: Critical"),
    /* @__PURE__ */ React.createElement("option", { value: "WARNING" }, "Severity: Warning"),
    /* @__PURE__ */ React.createElement("option", { value: "NORMAL" }, "Severity: Info / Normal")
  ), /* @__PURE__ */ React.createElement(
    "select",
    {
      value: alertStatusFilter,
      onChange: (e) => setAlertStatusFilter(e.target.value),
      className: "bg-white border border-slate-300 text-slate-700 text-xs font-mono font-bold px-3 py-1.5 rounded-lg focus:outline-none"
    },
    /* @__PURE__ */ React.createElement("option", { value: "ALL" }, "Status: All"),
    /* @__PURE__ */ React.createElement("option", { value: "ACTIVE" }, "Status: Active"),
    /* @__PURE__ */ React.createElement("option", { value: "ACKNOWLEDGED" }, "Status: Acknowledged"),
    /* @__PURE__ */ React.createElement("option", { value: "RESOLVED" }, "Status: Resolved")
  ))), /* @__PURE__ */ React.createElement("div", { className: "bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: "overflow-x-auto" }, /* @__PURE__ */ React.createElement("table", { className: "w-full text-left border-collapse text-xs" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", { className: "bg-slate-50 text-slate-500 font-mono text-[11px] border-b border-slate-200" }, /* @__PURE__ */ React.createElement("th", { className: "p-3.5 font-semibold" }, "SEVERITY"), /* @__PURE__ */ React.createElement("th", { className: "p-3.5 font-semibold" }, "TIME"), /* @__PURE__ */ React.createElement("th", { className: "p-3.5 font-semibold" }, "ASSET ID"), /* @__PURE__ */ React.createElement("th", { className: "p-3.5 font-semibold" }, "PARAMETER & VALUE"), /* @__PURE__ */ React.createElement("th", { className: "p-3.5 font-semibold" }, "DIAGNOSTIC MESSAGE"), /* @__PURE__ */ React.createElement("th", { className: "p-3.5 font-semibold" }, "STATUS"), /* @__PURE__ */ React.createElement("th", { className: "p-3.5 font-semibold text-right" }, "ACTION"))), /* @__PURE__ */ React.createElement("tbody", { className: "divide-y divide-slate-100" }, alerts.filter((a) => alertFilter === "ALL" || a.severity === alertFilter).filter((a) => alertStatusFilter === "ALL" || a.status === alertStatusFilter).map((al) => /* @__PURE__ */ React.createElement("tr", { key: al.id, className: "hover:bg-slate-50/80 transition-colors" }, /* @__PURE__ */ React.createElement("td", { className: "p-3.5" }, /* @__PURE__ */ React.createElement("span", { className: `inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold ${al.severity === "CRITICAL" ? "bg-red-50 text-red-700 border border-red-200" : al.severity === "WARNING" ? "bg-amber-50 text-amber-700 border border-amber-200" : "bg-emerald-50 text-emerald-700 border border-emerald-200"}` }, /* @__PURE__ */ React.createElement("span", { className: `w-1.5 h-1.5 rounded-full ${al.severity === "CRITICAL" ? "bg-red-500" : al.severity === "WARNING" ? "bg-amber-500" : "bg-emerald-500"}` }), al.severity)), /* @__PURE__ */ React.createElement("td", { className: "p-3.5 font-mono text-slate-500 whitespace-nowrap" }, al.timestamp), /* @__PURE__ */ React.createElement("td", { className: "p-3.5 font-mono font-bold text-slate-900" }, al.assetId), /* @__PURE__ */ React.createElement("td", { className: "p-3.5 font-mono" }, /* @__PURE__ */ React.createElement("span", { className: "font-bold text-slate-900" }, al.parameter), ": ", al.value, " ", al.unit, /* @__PURE__ */ React.createElement("span", { className: "text-[10px] text-slate-400 block" }, "(Threshold: ", al.threshold, " ", al.unit, ")")), /* @__PURE__ */ React.createElement("td", { className: "p-3.5 text-slate-700 max-w-xs" }, al.message), /* @__PURE__ */ React.createElement("td", { className: "p-3.5" }, /* @__PURE__ */ React.createElement("span", { className: `px-2 py-0.5 rounded text-[10px] font-mono font-bold ${al.status === "ACTIVE" ? "bg-red-100 text-red-800" : al.status === "ACKNOWLEDGED" ? "bg-blue-100 text-blue-800" : "bg-slate-100 text-slate-600"}` }, al.status), al.acknowledgedBy && /* @__PURE__ */ React.createElement("span", { className: "block text-[9px] text-slate-400 font-mono mt-0.5" }, al.acknowledgedBy)), /* @__PURE__ */ React.createElement("td", { className: "p-3.5 text-right whitespace-nowrap" }, al.status === "ACTIVE" && /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => handleAcknowledgeAlert(al.id),
      className: "px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded font-mono text-[11px] font-bold mr-1.5"
    },
    "Acknowledge"
  ), al.status !== "RESOLVED" && /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setResolveAlertTarget(al),
      className: "px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-mono text-[11px] font-bold"
    },
    "Resolve"
  ), al.status === "RESOLVED" && /* @__PURE__ */ React.createElement("span", { className: "text-[11px] font-mono text-slate-400" }, "Resolved"))))))))), activeModule === "maintenance" && /* @__PURE__ */ React.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", { className: "text-xl sm:text-2xl font-black text-slate-900 tracking-tight" }, "Predictive Maintenance & Work Orders"), /* @__PURE__ */ React.createElement("p", { className: "text-xs sm:text-sm text-slate-500 mt-1" }, "Automated maintenance ticketing, condition-based inspection schedule, and crew assignment.")), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement(
    "select",
    {
      value: workOrderFilter,
      onChange: (e) => setWorkOrderFilter(e.target.value),
      className: "bg-white border border-slate-300 text-slate-700 text-xs font-mono font-bold px-3 py-1.5 rounded-lg focus:outline-none"
    },
    /* @__PURE__ */ React.createElement("option", { value: "ALL" }, "Filter: All Orders"),
    /* @__PURE__ */ React.createElement("option", { value: "PENDING" }, "Filter: Pending"),
    /* @__PURE__ */ React.createElement("option", { value: "IN_PROGRESS" }, "Filter: In Progress"),
    /* @__PURE__ */ React.createElement("option", { value: "COMPLETED" }, "Filter: Completed")
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setShowNewWorkOrderModal(true),
      className: "flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold font-mono shadow-sm"
    },
    /* @__PURE__ */ React.createElement(Plus, { className: "w-4 h-4" }),
    /* @__PURE__ */ React.createElement("span", null, "Create Work Order")
  ))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4" }, workOrders.filter((w) => workOrderFilter === "ALL" || w.status === workOrderFilter).map((wo) => /* @__PURE__ */ React.createElement("div", { key: wo.id, className: "bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-3" }, /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("span", { className: "text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700" }, wo.id), /* @__PURE__ */ React.createElement("span", { className: `text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${wo.priority === "HIGH" ? "bg-red-50 text-red-700 border border-red-200" : "bg-blue-50 text-blue-700"}` }, wo.priority, " PRIORITY")), /* @__PURE__ */ React.createElement("h3", { className: "font-bold text-slate-900 text-sm" }, wo.title), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-slate-500 line-clamp-2" }, wo.description)), /* @__PURE__ */ React.createElement("div", { className: "pt-3 border-t border-slate-100 space-y-2 text-xs" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between text-slate-500" }, /* @__PURE__ */ React.createElement("span", null, "Asset:"), /* @__PURE__ */ React.createElement("span", { className: "font-mono font-bold text-slate-800" }, wo.assetId)), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between text-slate-500" }, /* @__PURE__ */ React.createElement("span", null, "Assigned To:"), /* @__PURE__ */ React.createElement("span", { className: "font-medium text-slate-700" }, wo.assignedTo)), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between text-slate-500" }, /* @__PURE__ */ React.createElement("span", null, "Target Due Date:"), /* @__PURE__ */ React.createElement("span", { className: "font-mono text-slate-700" }, wo.dueDate)), /* @__PURE__ */ React.createElement("div", { className: "flex gap-1.5 pt-2" }, ["PENDING", "IN_PROGRESS", "COMPLETED"].map((st) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: st,
      onClick: () => handleUpdateWoStatus(wo.id, st),
      className: `flex-1 py-1 rounded text-[10px] font-mono font-bold transition-colors ${wo.status === st ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`
    },
    st === "IN_PROGRESS" ? "IN PROGRESS" : st
  )))))))), activeModule === "assets" && /* @__PURE__ */ React.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", { className: "text-xl sm:text-2xl font-black text-slate-900 tracking-tight" }, "Transformer Asset Registry"), /* @__PURE__ */ React.createElement("p", { className: "text-xs sm:text-sm text-slate-500 mt-1" }, "Master inventory of fleet transformers, nameplate data, and edge instrumentation.")), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6" }, fleet.map((asset) => /* @__PURE__ */ React.createElement("div", { key: asset.id, className: "bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-start justify-between" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200" }, asset.id), /* @__PURE__ */ React.createElement("h2", { className: "text-base font-bold text-slate-900 mt-1.5" }, asset.name), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-slate-500" }, asset.location)), /* @__PURE__ */ React.createElement("span", { className: `px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold ${asset.status === "NORMAL" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}` }, asset.status)), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded-lg border border-slate-100 font-mono" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "text-slate-400 block text-[10px]" }, "RATING & VOLTAGE"), /* @__PURE__ */ React.createElement("span", { className: "font-bold text-slate-800" }, asset.capacityKva, " kVA \xB7 ", asset.voltageRating)), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "text-slate-400 block text-[10px]" }, "COOLING METHOD"), /* @__PURE__ */ React.createElement("span", { className: "font-bold text-slate-800" }, asset.coolingType)), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "text-slate-400 block text-[10px]" }, "MANUFACTURER"), /* @__PURE__ */ React.createElement("span", { className: "font-bold text-slate-800" }, asset.manufacturer)), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "text-slate-400 block text-[10px]" }, "COMMISSIONED"), /* @__PURE__ */ React.createElement("span", { className: "font-bold text-slate-800" }, asset.installationDate))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between text-xs pt-1" }, /* @__PURE__ */ React.createElement("span", { className: "text-slate-500" }, "Connected IoT Gateway: ", /* @__PURE__ */ React.createElement("strong", { className: "font-mono text-slate-800" }, asset.edgeDeviceId)), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => {
        setSelectedAssetId(asset.id);
        setHardwareScale(asset.id === "TG-ESP32-LOCAL" ? "bench" : "field");
        setActiveModule("monitoring");
      },
      className: "px-3 py-1.5 bg-blue-600 text-white rounded-lg font-mono text-xs font-bold hover:bg-blue-700"
    },
    "Inspect Live"
  )))))), activeModule === "reports" && /* @__PURE__ */ React.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", { className: "text-xl sm:text-2xl font-black text-slate-900 tracking-tight" }, "Fleet Reports & Analytical Exports"), /* @__PURE__ */ React.createElement("p", { className: "text-xs sm:text-sm text-slate-500 mt-1" }, "Compliance reporting, parameter trend archives, and official engineering logs.")), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4" }, /* @__PURE__ */ React.createElement("div", { className: "bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3" }, /* @__PURE__ */ React.createElement("div", { className: "w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center" }, /* @__PURE__ */ React.createElement(FileText, { className: "w-5 h-5" })), /* @__PURE__ */ React.createElement("h3", { className: "font-bold text-slate-900 text-base" }, "Comprehensive Fleet Telemetry CSV"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-slate-500" }, "Export all recorded multi-sensor data points across the fleet including oil temperature, winding hotspot, and THD."), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: downloadCsvReport,
      className: "w-full py-2 bg-slate-900 text-white rounded-lg font-mono text-xs font-bold hover:bg-slate-800 flex items-center justify-center gap-1.5"
    },
    /* @__PURE__ */ React.createElement(Download, { className: "w-4 h-4" }),
    /* @__PURE__ */ React.createElement("span", null, "Download Raw Telemetry CSV")
  )), /* @__PURE__ */ React.createElement("div", { className: "bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3" }, /* @__PURE__ */ React.createElement("div", { className: "w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center" }, /* @__PURE__ */ React.createElement(CheckCircle2, { className: "w-5 h-5" })), /* @__PURE__ */ React.createElement("h3", { className: "font-bold text-slate-900 text-base" }, "IEEE C57.91 Insulation Audit Report"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-slate-500" }, "Formal thermal loss-of-life audit documenting cumulative aging factor (F_AA) and estimated Remaining Useful Life."), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => window.print(),
      className: "w-full py-2 bg-slate-100 text-slate-800 rounded-lg font-mono text-xs font-bold hover:bg-slate-200 flex items-center justify-center gap-1.5"
    },
    /* @__PURE__ */ React.createElement(FileText, { className: "w-4 h-4" }),
    /* @__PURE__ */ React.createElement("span", null, "Print Formal Report")
  )), /* @__PURE__ */ React.createElement("div", { className: "bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3" }, /* @__PURE__ */ React.createElement("div", { className: "w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center" }, /* @__PURE__ */ React.createElement(AlertTriangle, { className: "w-5 h-5" })), /* @__PURE__ */ React.createElement("h3", { className: "font-bold text-slate-900 text-base" }, "Alarm & Incident Logbook"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-slate-500" }, "Export incident chronology including critical temperature excursions, combustible gas alerts, and engineer notes."), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: downloadCsvReport,
      className: "w-full py-2 bg-slate-100 text-slate-800 rounded-lg font-mono text-xs font-bold hover:bg-slate-200 flex items-center justify-center gap-1.5"
    },
    /* @__PURE__ */ React.createElement(Download, { className: "w-4 h-4" }),
    /* @__PURE__ */ React.createElement("span", null, "Export Incident Log")
  )))), activeModule === "devices" && /* @__PURE__ */ React.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", { className: "text-xl sm:text-2xl font-black text-slate-900 tracking-tight" }, "IoT Edge Gateways & Device Management"), /* @__PURE__ */ React.createElement("p", { className: "text-xs sm:text-sm text-slate-500 mt-1" }, "Hardware nodes status, sensor interfaces, and firmware configurations for ESP32 and STM32 gateways.")), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setShowFirmwareModal(true),
      className: "flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold font-mono shadow-sm"
    },
    /* @__PURE__ */ React.createElement(Code2, { className: "w-4 h-4" }),
    /* @__PURE__ */ React.createElement("span", null, "View ESP32 Firmware Sketch")
  )), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4" }, devices.map((dev) => /* @__PURE__ */ React.createElement("div", { key: dev.deviceId, className: "bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-start justify-between" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("span", { className: "font-mono font-bold text-sm text-slate-900" }, dev.deviceId), /* @__PURE__ */ React.createElement("span", { className: "text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold border border-emerald-200" }, "ONLINE")), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-slate-500 mt-0.5" }, "Asset Link: ", /* @__PURE__ */ React.createElement("strong", { className: "font-mono text-slate-700" }, dev.assetId))), /* @__PURE__ */ React.createElement("span", { className: "text-[11px] font-mono font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded" }, dev.hardware)), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded-lg border border-slate-100 font-mono" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "text-slate-400 block text-[10px]" }, "INTERFACE PROTOCOL"), /* @__PURE__ */ React.createElement("span", { className: "font-bold text-slate-800" }, dev.connectionType)), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "text-slate-400 block text-[10px]" }, "IP / MAC ADDRESS"), /* @__PURE__ */ React.createElement("span", { className: "font-bold text-slate-800" }, dev.ipAddress)), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "text-slate-400 block text-[10px]" }, "FIRMWARE BUILD"), /* @__PURE__ */ React.createElement("span", { className: "font-bold text-slate-800" }, dev.firmwareVersion)), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "text-slate-400 block text-[10px]" }, "UPTIME"), /* @__PURE__ */ React.createElement("span", { className: "font-bold text-slate-800" }, (dev.uptimeSeconds / 3600).toFixed(1), " hrs"))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block mb-1.5" }, "Connected Sensor Bus"), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap gap-1.5" }, dev.sensorsConnected.map((s, idx) => /* @__PURE__ */ React.createElement("span", { key: idx, className: "text-[11px] font-mono bg-slate-100 text-slate-700 px-2 py-0.5 rounded" }, s)))))))))), showFirmwareModal && /* @__PURE__ */ React.createElement("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in" }, /* @__PURE__ */ React.createElement("div", { className: "bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]" }, /* @__PURE__ */ React.createElement("div", { className: "p-4 border-b border-slate-800 flex items-center justify-between text-white" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement(Code2, { className: "w-5 h-5 text-blue-400" }), /* @__PURE__ */ React.createElement("h3", { className: "font-bold text-sm" }, "TransGuard AI \u2014 ESP32 Edge Firmware Sketch")), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setShowFirmwareModal(false),
      className: "p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
    },
    /* @__PURE__ */ React.createElement(X, { className: "w-4 h-4" })
  )), /* @__PURE__ */ React.createElement("div", { className: "p-4 overflow-y-auto flex-1 font-mono text-xs text-slate-300 bg-slate-950" }, /* @__PURE__ */ React.createElement("pre", null, ESP32_FIRMWARE_SKETCH)), /* @__PURE__ */ React.createElement("div", { className: "p-4 border-t border-slate-800 bg-slate-900/90 flex justify-between items-center" }, /* @__PURE__ */ React.createElement("span", { className: "text-xs text-slate-400 font-mono" }, "Compatible with Arduino IDE, PlatformIO, ESP-IDF"), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => {
        navigator.clipboard.writeText(ESP32_FIRMWARE_SKETCH);
        setCopiedCode(true);
        setTimeout(() => setCopiedCode(false), 2500);
        triggerToast("Firmware sketch copied to clipboard!", "success");
      },
      className: "flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-mono font-bold"
    },
    copiedCode ? /* @__PURE__ */ React.createElement(Check, { className: "w-4 h-4" }) : /* @__PURE__ */ React.createElement(Copy, { className: "w-4 h-4" }),
    /* @__PURE__ */ React.createElement("span", null, copiedCode ? "COPIED TO CLIPBOARD" : "COPY FIRMWARE CODE")
  )))), showConsoleDrawer && /* @__PURE__ */ React.createElement("div", { className: "fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-sm animate-fade-in" }, /* @__PURE__ */ React.createElement("div", { className: "w-full max-w-md bg-slate-900 text-white h-full flex flex-col shadow-2xl border-l border-slate-800" }, /* @__PURE__ */ React.createElement("div", { className: "p-4 border-b border-slate-800 flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement(Terminal, { className: "w-4 h-4 text-emerald-400" }), /* @__PURE__ */ React.createElement("h3", { className: "font-bold text-sm" }, "Telemetry Terminal & Stream Logs")), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setShowConsoleDrawer(false),
      className: "p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
    },
    /* @__PURE__ */ React.createElement(X, { className: "w-4 h-4" })
  )), /* @__PURE__ */ React.createElement("div", { className: "p-4 overflow-y-auto flex-1 space-y-2 font-mono text-xs" }, /* @__PURE__ */ React.createElement("div", { className: "text-[11px] text-slate-400 font-bold uppercase tracking-wider mb-2" }, "Incoming Frames (", rawLogs.length, ")"), rawLogs.map((log) => /* @__PURE__ */ React.createElement("div", { key: log.id, className: "p-2.5 rounded bg-slate-950 border border-slate-800 text-[11px]" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between text-[10px] text-slate-500 mb-1" }, /* @__PURE__ */ React.createElement("span", { className: "text-emerald-400 font-bold" }, log.source), /* @__PURE__ */ React.createElement("span", null, log.time)), /* @__PURE__ */ React.createElement("div", { className: "text-slate-300 break-all" }, log.raw)))))), showNewWorkOrderModal && /* @__PURE__ */ React.createElement("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm" }, /* @__PURE__ */ React.createElement("div", { className: "bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl border border-slate-200" }, /* @__PURE__ */ React.createElement("div", { className: "p-4 border-b border-slate-100 flex items-center justify-between" }, /* @__PURE__ */ React.createElement("h3", { className: "font-bold text-base text-slate-900" }, "Create New Maintenance Work Order"), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setShowNewWorkOrderModal(false),
      className: "p-1.5 rounded-lg text-slate-400 hover:bg-slate-100"
    },
    /* @__PURE__ */ React.createElement(X, { className: "w-4 h-4" })
  )), /* @__PURE__ */ React.createElement("form", { onSubmit: handleCreateWorkOrder, className: "p-5 space-y-4 text-xs" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "block font-bold text-slate-700 mb-1" }, "Target Transformer"), /* @__PURE__ */ React.createElement(
    "select",
    {
      value: newOrderForm.assetId,
      onChange: (e) => setNewOrderForm({ ...newOrderForm, assetId: e.target.value }),
      className: "w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-mono"
    },
    fleet.map((a) => /* @__PURE__ */ React.createElement("option", { key: a.id, value: a.id }, a.id, " \u2014 ", a.name))
  )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "block font-bold text-slate-700 mb-1" }, "Work Order Title"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      required: true,
      placeholder: "e.g. Inspect radiator cooling fans and DGA sampling",
      value: newOrderForm.title,
      onChange: (e) => setNewOrderForm({ ...newOrderForm, title: e.target.value }),
      className: "w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
    }
  )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "block font-bold text-slate-700 mb-1" }, "Description & Scope"), /* @__PURE__ */ React.createElement(
    "textarea",
    {
      rows: 3,
      placeholder: "Detail inspection procedures, safety lockouts, and required tools...",
      value: newOrderForm.description,
      onChange: (e) => setNewOrderForm({ ...newOrderForm, description: e.target.value }),
      className: "w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-3" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "block font-bold text-slate-700 mb-1" }, "Priority"), /* @__PURE__ */ React.createElement(
    "select",
    {
      value: newOrderForm.priority,
      onChange: (e) => setNewOrderForm({ ...newOrderForm, priority: e.target.value }),
      className: "w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-mono"
    },
    /* @__PURE__ */ React.createElement("option", { value: "HIGH" }, "HIGH"),
    /* @__PURE__ */ React.createElement("option", { value: "MEDIUM" }, "MEDIUM"),
    /* @__PURE__ */ React.createElement("option", { value: "LOW" }, "LOW")
  )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "block font-bold text-slate-700 mb-1" }, "Assigned Lead / Team"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      value: newOrderForm.assignedTo,
      onChange: (e) => setNewOrderForm({ ...newOrderForm, assignedTo: e.target.value }),
      className: "w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
    }
  ))), /* @__PURE__ */ React.createElement("div", { className: "pt-2 flex justify-end gap-2" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      type: "button",
      onClick: () => setShowNewWorkOrderModal(false),
      className: "px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-bold"
    },
    "Cancel"
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      type: "submit",
      className: "px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold shadow-sm"
    },
    "Create Order"
  ))))), resolveAlertTarget && /* @__PURE__ */ React.createElement("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm" }, /* @__PURE__ */ React.createElement("div", { className: "bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl border border-slate-200" }, /* @__PURE__ */ React.createElement("div", { className: "p-4 border-b border-slate-100 flex items-center justify-between" }, /* @__PURE__ */ React.createElement("h3", { className: "font-bold text-base text-slate-900" }, "Resolve Alarm: ", resolveAlertTarget.id), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setResolveAlertTarget(null),
      className: "p-1 rounded-lg text-slate-400 hover:bg-slate-100"
    },
    /* @__PURE__ */ React.createElement(X, { className: "w-4 h-4" })
  )), /* @__PURE__ */ React.createElement("div", { className: "p-4 space-y-3 text-xs" }, /* @__PURE__ */ React.createElement("div", { className: "p-2.5 rounded bg-slate-50 border border-slate-200 text-slate-600" }, /* @__PURE__ */ React.createElement("span", { className: "font-bold text-slate-900 block" }, resolveAlertTarget.parameter, " Violation"), resolveAlertTarget.message), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "block font-bold text-slate-700 mb-1" }, "Resolution Summary / Action Notes"), /* @__PURE__ */ React.createElement(
    "textarea",
    {
      rows: 3,
      placeholder: "e.g. Cleaned fan radiator grills, confirmed temperature returned below 65\xB0C.",
      value: resolveNotes,
      onChange: (e) => setResolveNotes(e.target.value),
      className: "w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "flex justify-end gap-2 pt-2" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setResolveAlertTarget(null),
      className: "px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg font-bold"
    },
    "Cancel"
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: handleResolveAlert,
      className: "px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold"
    },
    "Confirm Resolution"
  ))))));
}
function initTransGuard() {
  if (typeof React === "undefined" || typeof ReactDOM === "undefined") {
    setTimeout(initTransGuard, 30);
    return;
  }
  const container = document.getElementById("root");
  if (container) {
    const root = ReactDOM.createRoot(container);
    root.render(React.createElement(TransGuardApp));
    const loader = document.getElementById("loading");
    if (loader) {
      loader.style.opacity = "0";
      setTimeout(() => loader.remove(), 200);
    }
  }
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initTransGuard);
} else {
  initTransGuard();
}
