import { ApolloError } from '@apollo/client';
import Carousel, { slidesToShowPlugin } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import { IWorkshop } from "../../models/workshop";
import { DashboardError } from './DashboardError';
import { WorkshopCard } from './WorkshopCard';

interface WorkshopsCarouselProps {
    workshops: IWorkshop[] | undefined
    error: ApolloError | undefined
}

export const WorkshopsCarousel: React.FC<WorkshopsCarouselProps> = ({
    workshops,
    error
}) => {
    if (error) {
        return <DashboardError message={error.message} />
    };
    return (
        <>
            {workshops!.length > 0 && (
                <>
                    <div className="w-full text-gray-100 text-xl font-semibold px-4 mt-8">Workshops:</div>
                    <Carousel
                        plugins={[
                            'clickToChange',
                            {
                                resolve: slidesToShowPlugin,
                                options: {
                                    numberOfSlides: 2
                                }
                            },
                        ]}
                        itemWidth={275}
                    >
                        {workshops!.map((workshop: IWorkshop) => (
                            <WorkshopCard key={workshop.id} workshop={workshop} />
                        ))}
                    </Carousel>
                </>
            )}
        </>
    );
};