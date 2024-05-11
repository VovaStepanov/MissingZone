"use client";

import { Container } from "@/components/shared/Container";
import { AnnouncementsList } from "./_components/AnnouncementsList";
import { Filters } from "./_components/Filters";
import { useSearchParamsState } from "@/hooks/useSearchState";

const items = [
    {
        id: 1,
        image: "",
        title: "Test 1",
    },
    {
        id: 2,
        image: "",
        title: "Test 2",
    },
    {
        id: 3,
        image: "",
        title: "Test 3",
    },
    {
        id: 4,
        image: "",
        title: "Test 4",
    },
];

const AnnoncementsPage = () => {
    const [firstName, setFirstName] = useSearchParamsState<string>({
        name: "firstName",
    });
    const [lastName, setLastName] = useSearchParamsState<string>({
        name: "lastName",
    });
    const [surname, setSurname] = useSearchParamsState<string>({
        name: "surname",
    });
    const [city, setCity] = useSearchParamsState<string>({
        name: "city",
    });
    const [birthDate, setbirthDate] = useSearchParamsState<string>({
        name: "birthDate",
    });

    return (
        <div>
            <Container className="flex gap-4 py-4">
                <Filters
                    firstName={firstName}
                    lastName={lastName}
                    surname={surname}
                    city={city}
                    birthDate={birthDate}
                    setFirstName={setFirstName}
                    setLastName={setLastName}
                    setSurname={setSurname}
                    setCity={setCity}
                    setBirthDate={setbirthDate}
                    onSubmit={() => {}}
                />
                <AnnouncementsList items={items} />
            </Container>
        </div>
    );
};

export default AnnoncementsPage;
