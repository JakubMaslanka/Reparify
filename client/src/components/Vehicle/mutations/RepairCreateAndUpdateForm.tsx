import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CREATE_NEW_REPAIR_ENTRY, UPDATE_EXIST_REPAIR_ENTRY } from '../../../api/mutations';
import { GET_SINGLE_VEHICLE } from '../../../api/queries';
import { Form, Formik } from 'formik';
import { Checkbox, Input, TextArea } from '../../Formik';

import { ErrorBoundaryWithMessage } from '../../../utils/ErrorBoundaryWithMessage';
import { LoadingButton } from '../../../utils/LoadingButton';
import Toast from '../../../utils/Toast';

import { IVehicle } from '../../../models/vehicle';

interface IRepairCreateAndUpdateForm {
    activeVehicle: IVehicle | null
    updateMode?: IRepairCreateAndUpdateFormValues | null
    onDialogClose?: () => void
}

interface IRepairCreateAndUpdateFormValues {
    _id?: string
    workshop: string
    mileage: number
    description: string
    oilChange: boolean
    oilFilterChange: boolean
    fuelFilterChange: boolean
    dustFilterChange: boolean
    sparkPlugsChange: boolean
    airConditioningReview: boolean
    brakeFluid: boolean
    coolantFluid: boolean
    engineTiming: boolean
    recommendations: string
    otherChanges: string
}

export const RepairCreateAndUpdateForm: React.FC<IRepairCreateAndUpdateForm> = ({ 
    activeVehicle,
    updateMode,
    onDialogClose
}) => {
    const navigate = useNavigate();

    const [
        createNewRepair,
        { 
            loading: createLoading,
            error: createError
        }
    ] = useMutation(CREATE_NEW_REPAIR_ENTRY, {
        onCompleted: ({ addRepair: { success, vehicle, message }}) => {
            if (success && onDialogClose) {
                Toast('success', message);
                onDialogClose();
                navigate(`/vehicle/${vehicle.id}`)
            } else {
                Toast('error', message);
            }
        },
        onError: error => Toast('error', error.message),
        update: (cache, { data: { addRepair: { vehicle } } }) => {
            try {
                const cachedData = cache.readQuery({
                    query: GET_SINGLE_VEHICLE,
                    variables: { VehicleId: vehicle.id }
                })
                const copyOfCache = JSON.parse(JSON.stringify(cachedData));
                cache.writeQuery({
                    query: GET_SINGLE_VEHICLE,
                    variables: { VehicleId: vehicle.id },
                    data: copyOfCache
                })
            } catch (error) {
                Toast('error', error as string)
            }
        }
    });

    const [
        updateRepairEntry,
        { 
            loading: updateLoading,
            error: updateError
        }
    ] = useMutation(UPDATE_EXIST_REPAIR_ENTRY, {
        onCompleted: ({ editRepair: { success, message }}) => {
            if (success && onDialogClose) {
                Toast('success', message);
                onDialogClose();
            } else {
                Toast('error', message);
            }
        },
        onError: error => Toast('error', error.message),
        update: (cache, { data: { editRepair: { vehicle } } }) => {
            try {
                const cachedData = cache.readQuery({
                    query: GET_SINGLE_VEHICLE,
                    variables: { VehicleId: vehicle.id }
                })
                const copyOfCache = JSON.parse(JSON.stringify(cachedData));
                cache.writeQuery({
                    query: GET_SINGLE_VEHICLE,
                    variables: { VehicleId: vehicle.id },
                    data: copyOfCache
                })
            } catch (error) {
                Toast('error', error as string)
            }
        }
    });

    const validateData = (values: IRepairCreateAndUpdateFormValues) => {
        const errors: any = {};
        if (!values.workshop) {
            errors.workshop = "Workshop field is required!";
        }
        if (!values.mileage) {
            errors.mileage = "Mileage field is required!";
        } else if (!updateMode && activeVehicle && values.mileage <= activeVehicle.mileage) {
            errors.mileage = "Mileage can't be lower than last entry!";
        }
        return errors;
    };

    const handleFormSubmit = (values: IRepairCreateAndUpdateFormValues) => {
        if (updateMode) {
            const formValues = {...values};
            const id = activeVehicle!.id;
            updateRepairEntry({ variables: { repairID: updateMode._id, input: formValues, id } })
        } else {
            const formValues = {...values};
            const id = activeVehicle!.id;
            createNewRepair({ variables: { input: formValues, id } })
        };
    };

    if (createError || updateError) {
        return (
            <ErrorBoundaryWithMessage 
                withMenu={false} 
                title='Repiar Entry Operation' 
                message="Something has seriously gone wrong. We're trying to fix it as soon as possible." 
            />
        );
    };

    return (
        <>
            { activeVehicle ? (
                <>
                    <div className="px-4 pt-8">
                        <p className="text-greenish-light text-sm font-semibold">
                            You're currently {!!updateMode ? "editing" : "creating"} an repair entry for a vehicle:
                        </p>
                        <p className="text-gray-200 text-xl font-semibold">
                            {`${activeVehicle.mark} ${activeVehicle.model}`}
                        </p>
                        <p className="text-gray-400 text-md font-medium">
                            Vin: <span>{activeVehicle.vin}</span>
                        </p>
                        <p className="text-gray-300 text-md font-medium">
                            Last service: 
                            <span>
                                {activeVehicle.repairList[0] ? activeVehicle.repairList[activeVehicle.repairList.length - 1].createdAt : "No service entry found"}
                            </span>
                        </p>
                    </div>
                    <Formik 
                        initialValues={{
                            workshop: updateMode?.workshop || '',
                            mileage: activeVehicle.repairList[0] ? activeVehicle.repairList[activeVehicle.repairList.length - 1].mileage : activeVehicle.mileage || 0,
                            description: updateMode?.description || '',
                            oilChange: updateMode?.oilChange || false,
                            oilFilterChange: updateMode?.oilFilterChange || false,
                            fuelFilterChange: updateMode?.fuelFilterChange || false,
                            dustFilterChange: updateMode?.dustFilterChange || false,
                            sparkPlugsChange: updateMode?.sparkPlugsChange || false,
                            airConditioningReview: updateMode?.airConditioningReview || false,
                            brakeFluid: updateMode?.brakeFluid || false,
                            coolantFluid: updateMode?.coolantFluid || false,
                            engineTiming: updateMode?.engineTiming || false,
                            recommendations: updateMode?.recommendations || '',
                            otherChanges: updateMode?.otherChanges || ''
                        }} 
                        validate={validateData}
                        validateOnBlur={true}
                        onSubmit={handleFormSubmit}
                    >
                        <Form>
                            <Input type="text" disabled={!!updateMode} footnote={!!updateMode ? "This field can't be edited" : undefined} name="workshop" label="Workshop:" />
                            <Input type="number" disabled={!!updateMode} footnote={!!updateMode ? "This field can't be edited" : undefined} name="mileage" label="Mileage: " />
                            <TextArea name="description" label="Description:" />
                            <div className="flex flex-wrap flex-grow w-full ">
                                <Checkbox name="oilChange" label="Was oil changed: " />
                                <Checkbox name="oilFilterChange" label="Was oil filter changed: " />
                                <Checkbox name="fuelFilterChange" label="Was fuel filter changed: " />
                                <Checkbox name="dustFilterChange" label="Was dust filter changed: " />
                                <Checkbox name="sparkPlugsChange" label="Was spark plugs changed: " />
                                <Checkbox name="airConditioningReview" label="Was air conditioning reviewed: " />
                                <Checkbox name="brakeFluid" label="Was brake fluid changed: " />
                                <Checkbox name="coolantFluid" label="Was coolant fluid changed: " />
                                <Checkbox name="engineTiming" label="Was engine timing replaced: " />
                            </div>
                            <TextArea name="recommendations" label="Recommendations for next service:" />
                            <TextArea name="otherChanges" label="Other Changes:" />
                            <div className="flex flex-row w-full justify-center items-center gap-8 my-12">
                                <button type="button" onClick={onDialogClose} className="px-6 py-2 text-gray-100 bg-gray-800 border-gray-800 transition ease-in duration-200 uppercase rounded-2xl font-normal hover:bg-transparent hover:border-gray-800 border-2  focus:outline-none">
                                    Cancel
                                </button>
                                <LoadingButton text="Save" type={'submit'} condition={createLoading || updateLoading} className="px-6 py-2 text-greenish-light transition ease-in duration-200 uppercase rounded-2xl shadow-2xl font-semibold hover:bg-greenish-light hover:text-white-500 border-2 border-greenish-light focus:outline-none" />
                            </div>
                        </Form>
                    </Formik>
                </>
            ) : (
                <>
                    <h1>Something went wrong with fetching vehicle data.</h1>
                    <p>Try again later.</p>
                </>
            )}
        </>
    );
};