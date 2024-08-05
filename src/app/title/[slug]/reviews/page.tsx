import TabContent from "@/app/title/@component/tab.content.wrapper";
import Ratting from "@/app/title/[slug]/reviews/@component/ratting";
import IconSend from "@/components/icon/icon.send";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const ReviewsTab = () => {
    return (
        <TabContent>
            <Ratting></Ratting>
            <div className="relative">
                <Textarea className="min-h-[7rem] mt-4 bg-neutral-100 border border-[#a3a3a3] focus:border-[var(--primary-color)] focus:outline-none transition-all peer"></Textarea>
                <label className="absolute top-2 left-4 text-neutral-700 transition-all rounded text-base pointer-events-none peer-focus-within:text-xs peer-focus-within:-top-2 peer-focus-within:bg-white px-1 -mx-1 max-w-[calc(100% - 2rem)]">
                    <span className="relative z-[2] overflow-hidden whitespace-nowrap">Write a review</span>
                    <div className="absolute left-0 bottom-0 w-full h-1/2 z-[1] bg-neutral-100"></div>
                </label>
            </div>
            <div className="flex justify-end mt-6">
                <Button className="flex gap-1 items-center bg-primary-color p-1.5">
                    <IconSend></IconSend>
                    <span>Submit</span>
                </Button>
            </div>
        </TabContent>
    );
};

export default ReviewsTab;
