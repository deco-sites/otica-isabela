import { calcRemainingTime } from "$store/sdk/calcRemainingTime.ts";
import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import { dateGMT } from "$store/components/constants.ts";

interface ItemProps {
  label: string;
  value: number;
  type: "card" | "header" | "details";
  page?: "home" | "details";
}

interface Props {
  targetDate?: string;
  type: "card" | "header" | "details";
  page?: "home" | "details";
}

type Config = {
  card: {
    [key: string]: string;
  };
  header: {
    [key: string]: string;
  };
  details: {
    [key: string]: string;
  };
};

const config: Config = {
  card: {
    "font-color": "text-red-500",
    "font-size": "text-sm",
    "offer-fs": "text-xs lg:text-sm",
    "bold": "",
    "gap": "gap-2",
  },
  details: {
    "font-color": "text-red-500",
    "font-size": "text-sm",
    "offer-fs": "text-sm",
    "bold": "font-bold",
    "gap": "gap-2",
  },
  header: {
    "font-color": "text-red-500",
    "font-size": "text-2xl md:text-4xl",
    "offer-fs": "text-sm md:text-xl",
    "bold": "font-bold",
    "gap": "gap-2",
  },
};

const style = (props: string[], type: Props["type"]) =>
  props.map((p) => config[type][p]).join(" ");

export function StopwatchItem({ label, value, type, page }: ItemProps) {
  return (
    <div class={`text-center ${style(["font-size"], type)}`}>
      <p
        id={`item-${label}-value`}
        class={`${style(["font-color"], type)} font-bold ${
          page === "details" ? "lg:!text-xs !font-normal" : ""
        }`}
      >
        {value}
      </p>
      <p
        id={`item-${label}-label`}
        class={`${style(["bold"], type)} text-black text-xs lg:text-sm ${
          page === "details" ? "lg:!text-xs !font-normal" : ""
        }`}
      >
        {label}
      </p>
    </div>
  );
}

function Stopwatch({ targetDate, type, page }: Props) {
  const timeRemaining = useSignal<number>(0);

  useEffect(() => {
    if (!targetDate) return;

    // Handle ISO date strings (like "2025-10-06T23:00:00+00:00") directly
    // Don't concatenate with dateGMT since it's already a complete date string
    const date = new Date(targetDate);
    
    // Validate the date is valid
    if (isNaN(date.getTime())) {
      console.error('Invalid date provided to Stopwatch:', targetDate);
      return;
    }

    const interval = setInterval(() => {
      timeRemaining.value = calcRemainingTime(date);
    }, 999);

    return () => {
      clearInterval(interval);
    };
  }, [targetDate]);

  const seconds = Math.floor((timeRemaining.value / 1000) % 60);
  const minutes = Math.floor((timeRemaining.value / 1000 / 60) % 60);
  const hours = Math.floor((timeRemaining.value / (1000 * 60 * 60)) % 24);
  const days = Math.floor(timeRemaining.value / (1000 * 60 * 60 * 24));

  return (
    <div
      class={`w-fit mx-auto self-center ${type === "card" ? "mb-2.5" : ""}`}
    >
      <div
        class={`flex rounded-md pt-0 pb-0`}
      >
        <div class="w-full text-center my-0 mx-2.5">
          <p
            class={`${
              style(["font-color", "offer-fs", "bold"], type)
            } w-full block text-red-500 ${
              page === "details" ? "font-normal lg:text-sm" : ""
            }`}
          >
            Oferta termina em
          </p>
          <div
            class={`flex mt-0 mb-0 ml-auto mr-auto ${style(["gap"], type)} ${
              type === "details" ? "justify-evenly" : ""
            }`}
          >
            <StopwatchItem label="Dias" value={days} type={type} page={page} />
            <StopwatchItem
              label="Horas"
              value={hours}
              type={type}
              page={page}
            />
            <StopwatchItem
              label="Minutos"
              value={minutes}
              type={type}
              page={page}
            />
            <StopwatchItem
              label="Segundos"
              value={seconds}
              type={type}
              page={page}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stopwatch;
