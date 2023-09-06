import { useEffect, useRef } from "react";
import { IUseGlobalVariableManager } from "./use-global-variable-manager.interface";

export function useGlobalVariableManager(props?: IUseGlobalVariableManager.Props) {
  const {
    variableItems,
  } = props ?? {};
  const isAutoDeleteAtUnmounted = props?.isAutoDeleteAtUnmounted ?? true;

  const savedVariableItems = useRef<Map<string, IUseGlobalVariableManager.VariableItem>>(new Map());
  const variableItemNames = useRef<Set<string>>(new Set());

  function _setVariableItem(item: IUseGlobalVariableManager.VariableItem) {
    if (typeof window !== 'undefined') {
      const nameSplit = item.name.split('.');
      if (nameSplit.length === 1) {
        (window as any)[item.name] = item.value;
      } else {
        let currentObj: any = window;
        for (let i = 0; i < nameSplit.length; i++) {
          const name = nameSplit[i];

          if (i === nameSplit.length - 1) {
            currentObj[name] = item.value;
          } else {
            if (currentObj[name] === undefined) {
              currentObj[name] = {};
            }
          }
          currentObj = currentObj[name];
        }
      }
    }
  }

  function setVariableItems(_variableItems: IUseGlobalVariableManager.VariableItem[]) {
    _variableItems.forEach((item) => {
      savedVariableItems.current.set(item.name, item);
      variableItemNames.current.add(item.name);
      _setVariableItem(item);
    });
  }

  useEffect(() => {
    if (variableItems === undefined) return;
    for (const variableItem of variableItems) {
      savedVariableItems.current.set(variableItem.name, variableItem);
      _setVariableItem(variableItem);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variableItems]);

  useEffect(() => {
    const variableItemNamesCurrent = variableItemNames.current;

    savedVariableItems.current.forEach((item) => {
      variableItemNames.current.add(item.name);
      _setVariableItem(item);
    });

    return () => {
      if (typeof window !== 'undefined' && isAutoDeleteAtUnmounted) {
        for (const name of Array.from(variableItemNamesCurrent.values())) {
          (window as any)[name] = null;
        }
      } 
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    setVariableItems,
  };
}