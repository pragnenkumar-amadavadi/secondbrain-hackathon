import { MessageSquareWarning } from "lucide-react";
import { authStore } from "../../store/auth.store";

export const ChatInfo = () => {
    const { memberId } = authStore.getState();

    return <div className="flex flex-col gap-2 items-center justify-center h-full">
        <MessageSquareWarning />
        <p>
            Please provide {!memberId ? 'Member id' : 'Enterprise token'}
        </p>
    </div>
}