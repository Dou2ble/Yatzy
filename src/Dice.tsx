export interface DiceData {
  value: number;
  isLocked: boolean;
}

function Dot() {
  return <div className="bg-gray-200 size-2.5 rounded-full"></div>;
}

export function FancyDice(props: DiceData) {
  return (
    <div
      className={`border-4 border-gray-200 size-16 rounded-xl flex justify-center items-center transition-all hover:scale-115 ${props.isLocked ? "bg-red-900" : ""}`}
      title={`Value: ${props.value} ${props.isLocked ? "(locked)" : ""}`}
    >
      <div className="grid grid-cols-3 grid-rows-3 gap-1">
        {props.value == 1 && (
          <>
            <div></div>
            <div></div>
            <div></div>

            <div></div>
            <Dot />
            <div></div>

            <div></div>
            <div></div>
            <div></div>
          </>
        )}
        {props.value == 2 && (
          <>
            <div></div>
            <div></div>
            <Dot />

            <div></div>
            <div></div>
            <div></div>

            <Dot />
            <div></div>
            <div></div>
          </>
        )}
        {props.value == 3 && (
          <>
            <div></div>
            <div></div>
            <Dot />

            <div></div>
            <Dot />
            <div></div>

            <Dot />
            <div></div>
            <div></div>
          </>
        )}
        {props.value == 4 && (
          <>
            <Dot />
            <div></div>
            <Dot />

            <div></div>
            <div></div>
            <div></div>

            <Dot />
            <div></div>
            <Dot />
          </>
        )}
        {props.value == 5 && (
          <>
            <Dot />
            <div></div>
            <Dot />

            <div></div>
            <Dot />
            <div></div>

            <Dot />
            <div></div>
            <Dot />
          </>
        )}
        {props.value == 6 && (
          <>
            <Dot />
            <div></div>
            <Dot />

            <Dot />
            <div></div>
            <Dot />

            <Dot />
            <div></div>
            <Dot />
          </>
        )}
      </div>
    </div>
  );
}

FancyDice.defaultProps = {
  isLocked: false,
};
