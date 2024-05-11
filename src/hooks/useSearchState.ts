import { useCallback, useState } from "react";
import { useLatest } from "./useLatest";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function getSearchParam(search: string, param: string): string | null {
    const searchParams = new URLSearchParams(search);
    return searchParams.get(param);
}

function setSearchParam(search: string, param: string, value: string): string {
    const searchParams = new URLSearchParams(search);
    searchParams.set(param, value);
    return searchParams.toString();
}

const defaultDeserialize = <T>(v: string) => v as T;
const defaultSerialize = String;

export function useSearchParamsState<T>({
    name,
    serialize = defaultSerialize,
    deserialize = defaultDeserialize,
}: {
    name: string;
    serialize?: (value: T) => string;
    deserialize?: (value: string) => T;
}): [T, (newValue: T | ((prevState: T) => T)) => void] {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [value, setValue] = useState<T>(() => {
        const initialValue = deserialize(
            getSearchParam(searchParams.toString(), name) || "",
        );
        return initialValue;
    });
    const latestValue = useLatest(value);

    const updateValue = useCallback(
        (newValue: T | ((prevState: T) => T)) => {
            const search = searchParams.toString();
            const actualNewValue =
                typeof newValue === "function"
                    ? (newValue as (prevState: T) => T)(latestValue.current)
                    : newValue;

            setValue(actualNewValue);

            const newSearch = setSearchParam(
                search,
                name,
                serialize(actualNewValue),
            );

            router.push(`${pathname}?${newSearch}`);
        },
        [latestValue, name, serialize, pathname, router, searchParams],
    );

    return [value, updateValue];
}
