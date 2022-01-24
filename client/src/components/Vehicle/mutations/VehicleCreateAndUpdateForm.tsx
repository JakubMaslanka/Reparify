import { useRef, useState } from 'react';
import { Formik, Form } from 'formik';
import { Input, Select, options } from '../../Formik';
import { MdDeleteOutline, MdOutlineAddAPhoto } from 'react-icons/md';
import { CreateVehicleMutationVariables, IVehicle } from '../../../models/vehicle';

import { useMutation } from '@apollo/client';
import { UPLOAD_FILE } from '../../../api/mutations';
import Toast from '../../../utils/Toast';

interface IVehicleCreateAndUpdateForm {
    vehicle?: IVehicle
    onCancel: () => void
    onSubmit: (formData: CreateVehicleMutationVariables) => void
    onLoading: boolean
};

interface IPhotoList {
    url: string | null 
};

const validateData = (values: CreateVehicleMutationVariables) => {
    const errors: any = {};
    if (!values.mark) {
        errors.mark = 'Brand choice is required';
    }
    if (!values.model) {
        errors.model = 'Model field is required';
    }
    if (!values.vin) {
        errors.vin = 'Vin is required';
    } else if (
        !/\b[(A-H|J-N|P|R-Z|0-9)]{17}\b/i.test(values.vin)
    ) {
        errors.vin = 'The entered Vin code is invalid!';
    } 
    if (!values.fuelType) {
        errors.fuelType = 'Fuel type choice is required';
    }
    if (!values.bodyType) {
        errors.bodyType = 'Body type choice is required';
    }
    if (!values.transmission) {
        errors.transmission = 'Transmission type choice is required';
    }
    if (!values.mileage) {
        errors.mileage = 'Mileage field is required';
    } else if (values.mileage > 1000000 || values.mileage <= 0) {
        errors.mileage = 'The entered mileage value is invalid!';
    }
    if (!values.power) {
        errors.power = 'Power field is required';
    } else if (values.power > 1000 || values.power <= 10) {
        errors.power = 'The entered power value is invalid!';
    }
    if (!values.productionYear) {
        errors.productionYear = 'Production year is required';
    } else if (values.productionYear > new Date(Date.now()).getUTCFullYear() || values.productionYear <= 1920) {
        errors.productionYear = 'The entered production year value is invalid!';
    }
    if (!values.techReviewExpDate) {
        errors.techReviewExpDate = 'Validity of technical review is required';
    } 
    if (!values.insuranceExpDate) {
        errors.insuranceExpDate = 'Validity of insurance is required';
    }
    return errors;
};

export const VehicleCreateAndUpdateForm: React.FC<IVehicleCreateAndUpdateForm> = ({ vehicle, onCancel, onSubmit }): JSX.Element => {
    const emptyUrl = { url: null };
    //@ts-ignore
    const initialPhotosState = vehicle?.photos.map((url: string) => { return { url } }) || [...Array(5).keys()].map(_i => emptyUrl);
    const [photosList, setPhotosList] = useState<IPhotoList[]>(initialPhotosState);
    const [photosError, setPhotosError] = useState<boolean>(false);
    const fileInputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const draggingItem = useRef() as React.MutableRefObject<any>;
    const dragOverItem = useRef() as React.MutableRefObject<any>;

    const [fileUpload, { loading }] = useMutation(UPLOAD_FILE, {
        onCompleted: ({ fileUpload: { success, uploadFileList, message }}) => {
            if (success) {
                setPhotosList((prevState: IPhotoList[]) => {
                    let copyOfPhotos = [...prevState];
                    const arrayOfExistPhotos = prevState.filter((photo: IPhotoList) => photo.url)
                    if (arrayOfExistPhotos.length === 0) {
                        copyOfPhotos = [...uploadFileList, ...prevState]
                    } else {
                        copyOfPhotos = [...arrayOfExistPhotos, ...uploadFileList]
                        for (let i = 0; i < (5 - copyOfPhotos.length); i++) {
                            copyOfPhotos.push({url: null})
                        }
                    }
                    if (copyOfPhotos.length > 5) {
                        copyOfPhotos.splice(5, copyOfPhotos.length);
                    }
                    return [...copyOfPhotos]
                });
                Toast('success', message);
                setPhotosError(false);
            } else {
                Toast('error', message);
            }
        },
        onError: error => Toast('error', error.message)
    });
    
    const handleFileChange = (e: React.FormEvent) => {
        const file = (e.target as HTMLInputElement).files;
        if (file && file.length === 0) return;
        fileUpload({ variables: { file } });
    };
    const handlePictureDelete = (photo: IPhotoList) => setPhotosList(
        (prevState: IPhotoList[]) => {
            const copyOfPhotos = [...prevState];
            const indexOfPhotoToDelete = copyOfPhotos.findIndex((i: IPhotoList) => i === photo);
            copyOfPhotos.splice(indexOfPhotoToDelete, 1);
            copyOfPhotos.push({ url: null });
            return [...copyOfPhotos];
        }
    );
    const handleFileSelect = () => fileInputRef.current.click();
    const handleDragStart = (e: React.FormEvent, itemRef: any) => draggingItem.current = itemRef;
    const handleDragEnter = (e: React.FormEvent, itemRef: any) => dragOverItem.current = itemRef;
    const handleDragEnd = (e: React.FormEvent) => {
        const copyOfPhotos = [...photosList];
        const draggingItemContent = copyOfPhotos[draggingItem.current];
        copyOfPhotos.splice(draggingItem.current, 1);
        copyOfPhotos.splice(dragOverItem.current, 0, draggingItemContent);
            
        draggingItem.current = null;
        dragOverItem.current = null;
        setPhotosList(copyOfPhotos);
    };

    return (
        <Formik 
            initialValues={{
                mark: vehicle?.mark || 'Acura',
                model: vehicle?.model || '',
                vin: vehicle?.vin || '',
                techReviewExpDate: vehicle?.techReviewExpDate || '',
                insuranceExpDate: vehicle?.insuranceExpDate || '',
                fuelType: vehicle?.fuelType || 'Petrol',
                mileage: vehicle?.mileage || '',
                power: vehicle?.power || '',
                productionYear: vehicle?.productionYear || '',
                bodyType: vehicle?.bodyType || 'All-road',
                transmission: vehicle?.transmission || 'Manual',
                photos: initialPhotosState
            }} 
            validate={validateData}
            validateOnBlur={true}
            onSubmit={values => {
                if (!vehicle && photosList === initialPhotosState) {
                    setPhotosError(true);
                    return;
                }
                return onSubmit({...values, photos: photosList.map((item: IPhotoList) => item['url'])});
            }}
        >
            <Form>
                <Select 
                    name="mark"
                    label="Brand"
                    footnote="If your vehicle brand isn't on the list, select the last option 'Other vehicle'."
                    options={options.mark}
                />
                <Input type="text" name="model" label="Model/Generation:" />
                <Input type="text" name="vin" label="VIN:" disabled={!!vehicle} footnote={!!vehicle ? "This field can't be edited" : undefined} />
                <Input type="number" name="mileage" label="Mileage:" disabled={!!vehicle} footnote={!!vehicle ? "This field can't be edited" : undefined} />
                <Select 
                    name="fuelType"
                    label="Fuel Type"
                    options={options.fueltype}
                />
                <Input type="number" name="power" label="Horsepower:" footnote="Enter vehicle power in horsepower unit." />
                <Input type="number" name="productionYear" label="Year of Production:" />
                <Select 
                    name="bodyType"
                    label="Body Type"
                    options={options.bodytype}
                />
                <Select 
                    name="transmission"
                    label="Transmission Type:"
                    options={options.transmission}
                />
                <Input type="date" name="techReviewExpDate" label="Technical Review Expire Date:" />
                <Input type="date" name="insuranceExpDate" label="Insurance Expire Date:" />
                <div className="px-4 py-6">
                    <div className="flex flex-col flex-wrap gap-6 mt-4">
                        <div className="flex flex-col">
                            <h4 className="text-gray-200 text-lg font-semibold">
                                Photos:
                            </h4>
                            <p className="text-gray-400 text-sm font-medium">
                                The first photo will be the main photo. Drag the photos to reorder them.
                            </p>
                        </div>
                        <input type="file" ref={fileInputRef} className='hidden' multiple accept="image/png, image/jpeg" onChange={handleFileChange} />
                        <div className="flex flex-row flex-wrap gap-6">
                            {
                                photosList.map((photo: IPhotoList, index: number) => (
                                    photo.url ? (
                                        <div 
                                            onDragStart={(e) => handleDragStart(e, index)}
                                            onDragEnter={(e) => handleDragEnter(e, index)}
                                            onDragOver={(e) => e.preventDefault()}
                                            onDragEnd={handleDragEnd}
                                            className={`relative bg-gradient-to-t from-gray-700 to-gray-gray-200 w-32 h-32 rounded-xl border-2 cursor-move ${index === 0 ? 'border-greenish-dark' : 'border-gray-800'}`}
                                            key={index}
                                            draggable
                                        >
                                            <MdDeleteOutline onClick={() => handlePictureDelete(photo)} className="absolute bottom-1 right-1 z-50 cursor-pointer" size="1.7rem" color="#3BA55D" />
                                            <img className="w-full h-full rounded-xl object-cover mx-auto" src={photo.url} alt={'vehicle-picture-' + index} />
                                        </div>
                                    ) : (
                                        <EmptyPictureCard 
                                            key={index}
                                            isPictureLoading={loading}
                                            mainCard={index === 0} 
                                            onClick={handleFileSelect}
                                        />
                                    )
                                ))
                            }
                        </div>
                        {photosError && <p className="text-danger-dark text-lg font-medium">You have to upload at least one photo of your the vehicle</p>}
                    </div>
                </div>
                <div className="flex flex-row w-full justify-center items-center gap-8 my-12">
                    <button type="button" onClick={onCancel} className="px-6 py-2 text-gray-100 bg-gray-800 border-gray-800 transition ease-in duration-200 uppercase rounded-2xl font-normal hover:bg-transparent hover:border-gray-800 border-2  focus:outline-none">
                        Cancel
                    </button>
                    <button type="submit" className="px-6 py-2 text-greenish-light transition ease-in duration-200 uppercase rounded-2xl font-semibold hover:bg-greenish-light hover:text-white-500 border-2 border-greenish-light focus:outline-none" >
                        Save
                    </button>
                </div>
            </Form>
        </Formik>
    );
};

interface IEmptyPictureCard {
    mainCard?: boolean
    isPictureLoading: boolean
    onClick: () => void 
};

const EmptyPictureCard: React.FC<IEmptyPictureCard> = ({
    mainCard = false,
    isPictureLoading,
    onClick
}) => (
    <div onClick={onClick} className={`bg-gradient-to-t from-gray-700 to-gray-gray-200 w-32 h-32 rounded-md shadow-2xl border-2 ${mainCard ? 'border-greenish-dark' : 'border-gray-800'}`}>
        <div className="flex flex-col w-full h-full gap-2 justify-center items-center cursor-pointer">
            {
                isPictureLoading ? (
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="#4FDC7C" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="#4FDC7C" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                ) : (
                    <MdOutlineAddAPhoto color={mainCard ? "#4FDC7C" : "#72767D"} size="1.75rem" />
                )
            }
            {mainCard && <p className="text-greenish-light text-md font-semibold">Add photo</p>}
        </div>
    </div>
);