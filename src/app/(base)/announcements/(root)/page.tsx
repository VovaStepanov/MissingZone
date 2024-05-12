"use client";

import { Container } from "@/components/shared/Container";
import { AnnouncementsList } from "./_components/AnnouncementsList";
import { Filters } from "./_components/Filters";
import { useSearchParamsState } from "@/hooks/useSearchState";
import { useAnouncementsQuery } from "@/queries/useAnnouncementsQuery";
import { AnnouncementsFiltersType } from "@/services/announcements.service";
import { useEffect, useRef } from "react";

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

    const observer = useRef<IntersectionObserver>();
    const lastItemRef = useRef<HTMLDivElement | null>(null);

    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
        isLoading,
    } = useAnouncementsQuery({
        birthDate,
        city,
        firstName,
        lastName,
        surname,
    } as AnnouncementsFiltersType);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: "0px",
            threshold: 1.0,
        };

        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasNextPage) {
                fetchNextPage();
            }
        }, options);

        if (lastItemRef.current) {
            observer.current.observe(lastItemRef.current);
        }

        return () => {
            if (observer.current && lastItemRef.current) {
                observer.current.unobserve(lastItemRef.current);
            }
        };
    }, [hasNextPage, fetchNextPage]);

    console.log(data);
    
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
                <div>
                    {data?.pages?.map((page, i) => (
                        <AnnouncementsList
                            items={page?.data}
                            key={page.pageNumber}
                        />
                    ))}
                    <div ref={lastItemRef}></div>
                </div>
            </Container>
        </div>
    );
};

export default AnnoncementsPage;
