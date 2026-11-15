// Global TypeScript definitions for TransGuard AI App

declare namespace React {
  export type PointerEvent<T = any> = {
    clientX: number;
    clientY: number;
    currentTarget: T;
    target: any;
    preventDefault: () => void;
    stopPropagation: () => void;
  };
  export type FormEvent<T = any> = {
    preventDefault: () => void;
    stopPropagation: () => void;
    target: any;
    currentTarget: T;
  };
  export type ComponentType<P = any> = (props: P & { key?: any; ref?: any }) => any;
  export type ReactNode = any;
  export type ReactElement = any;
  export type FC<P = {}> = (props: P & { key?: any; ref?: any }) => any;
  export type CSSProperties = Record<string, any>;
  export const useState: <T>(initialState: T | (() => T)) => [T, (newState: T | ((prev: T) => T)) => void];
  export const useEffect: (effect: () => void | (() => void), deps?: any[]) => void;
  export const useRef: <T>(initialValue?: T) => { current: T };
  export const useMemo: <T>(factory: () => T, deps: any[]) => T;
  export const useCallback: <T extends (...args: any[]) => any>(callback: T, deps: any[]) => T;
  export const memo: <P>(component: (props: P) => any) => (props: P & { key?: any; ref?: any }) => any;
  export const createElement: (type: any, props?: any, ...children: any[]) => any;
  export const Fragment: any;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
    interface Element {
      type: any;
      props: any;
      key: any;
    }
  }
}

declare module 'react' {
  export = React;
}

declare module 'react/jsx-runtime' {
  export const jsx: any;
  export const jsxs: any;
  export const Fragment: any;
}

declare module 'react/jsx-dev-runtime' {
  export const jsxDEV: any;
  export const Fragment: any;
}

declare module 'react-dom' {
  const ReactDOM: {
    createRoot: (container: Element | null) => {
      render: (element: any) => void;
      unmount: () => void;
    };
  };
  export default ReactDOM;
  export const createRoot: (container: Element | null) => {
    render: (element: any) => void;
    unmount: () => void;
  };
}

declare module 'react-dom/client' {
  export const createRoot: (container: Element | null) => {
    render: (element: any) => void;
    unmount: () => void;
  };
}

declare module 'lucide-react' {
  export const Shield: any;
  export const Activity: any;
  export const Usb: any;
  export const Wifi: any;
  export const Cpu: any;
  export const Thermometer: any;
  export const Flame: any;
  export const Zap: any;
  export const Gauge: any;
  export const Waves: any;
  export const CloudFog: any;
  export const Sun: any;
  export const Play: any;
  export const Pause: any;
  export const Download: any;
  export const Sliders: any;
  export const Terminal: any;
  export const Code2: any;
  export const Copy: any;
  export const Check: any;
  export const X: any;
  export const AlertTriangle: any;
  export const CheckCircle2: any;
  export const RefreshCw: any;
  export const Radio: any;
  export const Plug: any;
  export const LineChart: any;
  export const Layers: any;
  export const Search: any;
  export const Filter: any;
  export const Calendar: any;
  export const FileText: any;
  export const Settings: any;
  export const Plus: any;
  export const Wrench: any;
  export const Clock: any;
  export const ArrowUpRight: any;
  export const HardDrive: any;
  export const Server: any;
  export const BarChart3: any;
  export const Database: any;
  export const Bell: any;
  export const User: any;
  export const ExternalLink: any;
  export const ChevronRight: any;
  export const Info: any;
}
