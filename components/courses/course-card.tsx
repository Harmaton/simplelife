'use client';
import Image from 'next/image';
import Link from 'next/link';
import { BookOpen, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { IconArrowNarrowRight } from '@tabler/icons-react';
import { Course, User } from '@prisma/client';

interface CourseCardProps {
    course: Course;
    teacher: User | null;
}

export default function CourseCard({ course, teacher }: CourseCardProps) {
    const [remainingDays, setRemainingDays] = useState<number | null>(null);
    const [status, setStatus] = useState<string>('');
    const router = useRouter();

    useEffect(() => {
        if (course.startDate) {
            const currentDate = new Date();
            const startDateAsDate = new Date(course.startDate);
            if (currentDate.getTime() >= startDateAsDate.getTime()) {
                setStatus('In Progress');
            } else {
                const diffTime = Math.abs(startDateAsDate.getTime() - currentDate.getTime());
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                setRemainingDays(diffDays);
            }
        }
    }, [course.startDate]);

    const renderStatusBadge = () => {
        if (status === 'In Progress') {
            return <Badge variant="destructive" className="bg-green-500">In Progress</Badge>;
        } else if (remainingDays !== null) {
            if (remainingDays < 7) {
                return <Badge variant="destructive">Starts in {remainingDays} days</Badge>;
            } else if (remainingDays >= 7 && remainingDays <= 28) {
                return <Badge>Starts in {remainingDays} days</Badge>;
            } else if (remainingDays > 28) {
                return <Badge variant="secondary">Starts in {remainingDays} days</Badge>;
            }
        }
        return null;
    };

    const renderButton = () => {
        const handleClick = () => {
            router.push(`/courses/${course.id}`);
        };

        return (
            <Button onClick={handleClick} variant="ghost" className="bg-blue-500 mr-2">
                View Course
                <IconArrowNarrowRight className="h-4 w-4" />
            </Button>
        );
    };

    return (
        <div className="group transition space-y-4 overflow-hidden border hover:shadow-md rounded-lg p-3 max-w-md md:max-w-none sm:my-4 m-auto">
            <div className="relative w-full aspect-video rounded-md overflow-hidden">
                {course.imageUrl && (
                    <Image fill className="object-cover" alt={course.title} src={course.imageUrl} />
                )}
            </div>

            <div className="flex flex-col pt-2">
                <div className="text-lg md:text-base font-medium group-hover:text-sky-700 transition truncate">
                    {course.title}
                </div>

                <p className="text-xs text-muted-foreground">{teacher?.nickname}</p>
                <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
                    <span className="text-slate-500">
                        {teacher?.email}
                    </span>
                </div>

                <div className="flex flex-row items-center gap-x-1 mt-2 text-slate-500">
                    <Calendar className="mr-2 h-4 w-4" />
                    {course.startDate && (
                        <span className="text-slate-500">
                            {new Date(course.startDate).toLocaleDateString('en-US')}
                        </span>
                    )}
                </div>

                <div className="flex justify-between items-center gap-x-2 mt-2">
                    <div className="flex items-center gap-x-2 flex-grow">
                        {renderStatusBadge()}
                    </div>
                    <div className="flex items-center">{renderButton()}</div>
                </div>
            </div>
        </div>
    );
}
