"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChangeEvent, ComponentPropsWithoutRef, FC } from "react";

interface FiltersPropsType extends ComponentPropsWithoutRef<"div"> {
    firstName: string;
    setFirstName: (value: string) => void;
    lastName: string;
    setLastName: (value: string) => void;
    surname: string;
    setSurname: (value: string) => void;
    birthDate: string;
    setBirthDate: (value: string) => void;
    city: string;
    setCity: (value: string) => void;
    onSubmit: () => void;
}

export const Filters: FC<FiltersPropsType> = ({
    firstName,
    setFirstName,
    lastName,
    setLastName,
    surname,
    setSurname,
    birthDate,
    setBirthDate,
    city,
    setCity,
    onSubmit,
}) => {
    return (
        <div className="flex gap-3 flex-row flex-wrap lg:flex-nowrap lg:flex-col lg:max-w-[250px]">
            <Input
                placeholder="Прізвище"
                value={firstName}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setFirstName(e.target.value)
                }
                className="w-[48%] lg:w-full"
            />
            <Input
                placeholder="Ім'я"
                value={lastName}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setLastName(e.target.value)
                }
                className="w-[48%] lg:w-full"
            />
            <Input
                placeholder="По батькові"
                value={surname}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setSurname(e.target.value)
                }
                className="w-[48%] lg:w-full"
            />
            <Input
                placeholder="Місто"
                value={city}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setCity(e.target.value)
                }
                className="w-[48%] lg:w-full"
            />
            <Input
                placeholder="Дата народження"
                type="date"
                value={birthDate}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setBirthDate(e.target.value)
                }
                className="justify-between w-[48%] lg:w-full"
            />
            {/* <Button className="w-full" onClick={onSubmit}>
                Знайти
            </Button> */}
        </div>
    );
};
