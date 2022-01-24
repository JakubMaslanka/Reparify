import { useQuery } from "@apollo/client";
import { GET_SINGLE_WORKSHOP } from "../api/queries";
import { useParams } from "react-router-dom";
import { WorkshopDetails } from "../components/Workshop/WorkshopDetails";
import { LoadingSpinner } from "../utils/LoadingSpinner";
import { ErrorBoundaryWithMessage } from "../utils/ErrorBoundaryWithMessage";

import { IWorkshop } from "../models/workshop";

import useDocumentTitle from "../hooks/useDocumentTitle";
import Toast from "../utils/Toast";

export const SingleWorkshopPage = () => {
    const { id } = useParams();
    const {
        loading,
        error,
        data
    } = useQuery<{ workshop: IWorkshop }>(GET_SINGLE_WORKSHOP, {
        variables: {
            id
        },
        onError: error => Toast('error', error.message),
        errorPolicy: "all",
    });
    useDocumentTitle(`${!!data?.workshop ? `${data!.workshop.name} | Reparify` : 'Workshop page | Reparify'}`);

    if (loading) {
        return <LoadingSpinner />
    } else if (error) {
        return <ErrorBoundaryWithMessage title='Workshop page' message='Workshop not found, sorry... 😥' />
    }
    const { workshop } = data!;

    return <WorkshopDetails workshop={workshop} />
};