import { HiOutlineChevronLeft } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom';
import { IWorkshop } from '../../models/workshop';
import { IComment } from '../../models/comment';
import { CommentElement } from './CommentElement';
import { RatingByStar } from './RatingByStar';
import { WorkshopInfoLabel } from './WorkshopInfoLabel';

interface WorkshopDetailsProps { 
    workshop: IWorkshop 
}

export const WorkshopDetails: React.FC<WorkshopDetailsProps> = ({ workshop }) => {
    const navigate = useNavigate();
    return (
        <div className="max-w-5xl relative mx-auto">
            <HiOutlineChevronLeft onClick={() => navigate('/dashboard')} className="absolute top-6 left-4" color="#FAFAFA" size="1.8rem" />
            <div className="flex items-center md:items-start flex-col md:flex-row justify-center gap-4">
                <div className="block relative mt-8">
                    <img alt="profil" src={workshop.photo} className="mx-auto object-cover rounded-full h-40 w-40 "/>
                </div>
                <div className="w-full md:w-2/3">
                    <div className="flex flex-col mt-4 md:mt-8 px-4">
                        <span className="font-semibold text-gray-100 text-center md:text-left text-lg uppercase break-words">
                            {workshop.name}
                        </span>
                        <span className="text-gray-400 w-full md:w-2/3 text-center md:text-left text-md md:text-lg break-words">
                            {workshop.description}
                        </span>
                        <span className="text-gray-300 text-left text-lg font-medium mt-2">
                            Rating:
                        </span>
                        <div className="flex flex-row justify-start items-center gap-1">
                            <RatingByStar rateAsNumber={+workshop.reviewScore} />
                            <span className="text-sm font-medium text-gray-400">({workshop.comments.length})</span>
                        </div>
                    </div>
                </div>
            </div>
            <hr className="border-greenish-light mx-4 my-4" />
            
            <WorkshopInfoLabel label='Phone number:' firstLine={workshop.phoneNumber.toString()} />
            <WorkshopInfoLabel label='Email:' firstLine={workshop.email.toString()} />
            <WorkshopInfoLabel label='Address:' firstLine={workshop.address1} secondLine={workshop.address2} />
            <WorkshopInfoLabel label='Opening hours:' firstLine={workshop.openingDays} secondLine={workshop.openingHours} />

            <p className="text-gray-200 text-center text-xl font-medium uppercase my-6">Reviews:</p>
            <div className="px-4">
                { !!workshop.comments && workshop.comments.length > 0 ? (
                    workshop.comments.map((comment: IComment) => <CommentElement key={comment._id} comment={comment} />)
                ) : (
                    <div className="flex flex-col justify-center items-center px-4 py-2 text-center">
                        <span>🙄</span>
                        <span className="mt-2 text-base text-gray-400">It looks like no one has rated this workshop yet...</span>
                        <span onClick={() => navigate('/signup')} className="text-greenish-light text-lg font-medium hover:underline cursor-pointer">Create an account and be the first to do that</span>
                    </div>
                )}
            </div>
        </div>
    )
};