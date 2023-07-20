"use client"
import { useGlobalVariableManager } from "@/hooks/use-global-variable-manager/use-global-variable-manager.hook";
import { useEffect, useState } from "react";

export default function Page() {
  const [timestamp, setTimestamp] = useState<number>(0);

  useGlobalVariableManager({
    variableItems: [
      {
        name: 'func1',
        value: () => {
          console.log('hello1~', timestamp);
        },
      },
      {
        name: 'func2',
        value: () => {
          console.log('hello2~', timestamp);
        },
      },
    ],
  });
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTimestamp(new Date().getTime());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      console 창에서 func1 함수와 func2 함수를 호출해보세요.
    </>
  );
}
