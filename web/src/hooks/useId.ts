import { useRef, useEffect } from "react";

import { getUniqueId } from "@web/helpers/simple";

export default function useId(id?: string | number) {
  const idRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    idRef.current = id?.toString() || getUniqueId();
  }, [id]);

  return idRef.current;
}
