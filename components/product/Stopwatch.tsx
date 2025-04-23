import Icon from "$store/components/ui/Icon.tsx";
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
  targetDate: string;
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
    "gap": "gap-1",
  },
  details: {
    "font-color": "text-red-500",
    "font-size": "text-sm",
    "offer-fs": "text-sm",
    "bold": "font-bold",
    "gap": "gap-1",
  },
  header: {
    "font-color": "text-red-500",
    "font-size": "text-xs lg:text-sm",
    "offer-fs": "text-l md:text-xl",
    "bold": "font-bold",
    "gap": "gap-1",
  },
};

const style = (props: string[], type: Props["type"]) =>
  props.map((p) => config[type][p]).join(" ");

export function StopwatchItem({ label, value, type, page }: ItemProps) {
  return (
    <div
      class={`text-center ${label === "S" ? "min-w-[22px]" : ""} ${
        style(["font-size"], type)
      }`}
    >
      {page === "home"
        ? (
          <>
            <p
              id={`item-${label}-value`}
              class={`${style(["font-color"], type)} ${
                page === "home" ? "!text-2xl !md:text-4xl" : ""
              }`}
            >
              {value}
            </p>
            <p
              id={`item-${label}-label`}
              class={`text-black text-xs lg:text-sm }`}
            >
              {label}
            </p>
          </>
        )
        : (
          <>
            <p
              id={`item-${label}-label`}
              class={`text-black text-xs lg:text-sm }`}
            >
              {label}
            </p>
            <p
              id={`item-${label}-value`}
              class={`${style(["font-color"], type)}`}
            >
              {value}
            </p>
          </>
        )}
    </div>
  );
}

function Stopwatch({ targetDate, type, page }: Props) {
  const timeRemaining = useSignal<number>(0);

  useEffect(() => {
    if (!targetDate) return;

    const date = new Date(`${targetDate} ${dateGMT}`);
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
      class={`${
        page === "home" ? "border border-red-500 rounded-md" : ""
      } w-auto md:w-full self-center ${type === "card" ? "mb-2.5" : ""}`}
    >
      <div
        class={`flex justify-end rounded-md pt-0 pb-0`}
      >
        {type === "card" && (
          <div class="text-red-500 px-0 rounded-sm flex items-center justify-center">
            <Icon id="Stopwatch" width={25} height={25} class="" />
          </div>
        )}
        {type === "details" && (
          <div class="text-red-500 px-8 w-32 rounded-sm flex items-center justify-center">
            <Icon id="Stopwatch" width={25} height={25} class="" />
          </div>
        )}
        <div
          class={`w-fit ${
            page === "home" ? "min-w-[330px]" : "min-w-[66px]"
          } text-center my-0 mx-2.5`}
        >
          {page === "home" && (
            <p
              class={`${
                style(["font-color", "offer-fs", "bold"], type)
              } w-full block text-red-500`}
            >
              Oferta termina em
            </p>
          )}

          <div
            class={`flex justify-between mt-0 mb-0 ml-auto mr-auto md:gap-0 ${
              style(["gap"], type)
            } ${type === "details" ? "justify-evenly" : ""}`}
          >
            <StopwatchItem
              label={`${page === "home" ? "Dias" : "D"}`}
              value={days}
              type={type}
              page={page}
            />
            <span
              class={`text-red-500 text-xs lg:text-sm flex items-end ${
                page === "home" ? "hidden" : ""
              }`}
            >
              :
            </span>
            <StopwatchItem
              label={`${page === "home" ? "Horas" : "H"}`}
              value={hours}
              type={type}
              page={page}
            />
            <span
              class={`text-red-500 text-xs lg:text-sm flex items-end ${
                page === "home" ? "hidden" : ""
              }`}
            >
              :
            </span>
            <StopwatchItem
              label={`${page === "home" ? "Minutos" : "M"}`}
              value={minutes}
              type={type}
              page={page}
            />
            <span
              class={`text-red-500 text-xs lg:text-sm flex items-end mx-1 ${
                page === "home" ? "hidden" : ""
              }`}
            >
              :
            </span>
            <StopwatchItem
              label={`${page === "home" ? "Segundos" : "S"}`}
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
