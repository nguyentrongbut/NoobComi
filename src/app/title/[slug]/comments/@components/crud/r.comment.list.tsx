import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import IconHeart from "@/components/icon/icon.heart";
import IconComments from "@/components/icon/icon.comments";

dayjs.extend(relativeTime);

const RCommentList: React.FC<RCommentListProps> = ({
    comments,
    parentId = null,
}) => {
    const nestedComments = comments?.filter(
        (comment) => comment.parentId === parentId
    );

    return (
        <section>
            {nestedComments.map((comment) => (
                <div key={comment.id} className="relative flex pt-4">
                    <div className={`${parentId ? "pl-4" : "pl-0"}`}>
                        {parentId && (
                            <div className="absolute top-0 left-4 h-full w-[2px] bg-neutral-300"></div>
                        )}
                    </div>
                    <div className={`pt-4 ${parentId !==null && "pl-10"}`}>
                        <div className="flex gap-4">
                            <Link href="/">
                                {" "}
                                <Avatar className="size-10 mb-auto">
                                    <AvatarImage
                                        src={comment?.author?.avatar}
                                        alt={comment?.author?.name}
                                    />
                                    <AvatarFallback>
                                        {comment?.author?.name}
                                    </AvatarFallback>
                                </Avatar>
                            </Link>
                            <div>
                                <Link href="/" className="font-medium">
                                    {comment?.author.name}
                                </Link>
                                <div className="opacity-70 text-xs sm:text-sm flex gap-1">
                                    <Link href="/">
                                        {`@${comment?.author?.name}`}
                                    </Link>
                                    <span>•</span>
                                    <span>
                                        {dayjs(comment?.updatedAt).fromNow()}
                                    </span>
                                </div>
                                <p className="mt-1 mb-2">{comment?.message}</p>
                                <div className="flex items-center text-neutral-700 text-xs sm:text-sm font-medium">
                                    <div className="p-[5px] cursor-pointer flex items-center gap-1">
                                        <IconHeart className="size-5"></IconHeart>
                                        <span>React</span>
                                    </div>
                                    <div className="p-[5px] cursor-pointer">
                                        <IconComments></IconComments>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <RCommentList
                            comments={comments}
                            parentId={comment?.id}
                        />
                    </div>
                </div>
            ))}
        </section>
    );
};

export default RCommentList