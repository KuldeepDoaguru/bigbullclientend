import { FaRegHeart, FaUserPlus, FaRegCommentDots, FaUserCircle } from 'react-icons/fa';

const notifications = [
    {
        id: 1,
        user: "Mark Webber",
        action: "reacted to your recent post",
        post: "My first tournament today!",
        time: "1m ago",
        unread: true,
        icon: <FaRegHeart className="h-6 w-6 text-red-500" />,

    },
    {
        id: 2,
        user: "Angela Gray",
        action: "followed you",
        time: "5m ago",
        unread: true,
        icon: <FaUserPlus className="h-6 w-6 text-blue-500" />
    },
    {
        id: 3,
        user: "Jacob Thompsoapn",
        action: "has joined your group",
        group: "Chess Club",
        time: "1 day ago",
        unread: true,
        icon: <FaUserCircle className="h-6 w-6 text-green-500" />
    },
    {
        id: 4,
        user: "Rizky Hasanuda",
        action: "sent you a private message",
        message: "Hello, thanks for setting up the Chess Club. I've been a member for a few weeks now and I'm already having lots of fun and improving my game.",
        time: "5 days ago",
        unread: false,
        icon: <FaRegCommentDots className="h-6 w-6 text-yellow-500" />
    },
    {
        id: 5,
        user: "Kimberly Smita",
        action: "commented on your picture",
        time: "1 week ago",
        unread: false,
        icon: <FaRegCommentDots className="h-6 w-6 text-gray-500" />
    },
    {
        id: 6,
        user: "Nathan Petersa",
        action: "reacted to your recent post",
        post: "5 end-game strategies to increase your win rate",
        time: "2 weeks ago",
        unread: false,
        icon: <FaRegHeart className="h-6 w-6 text-red-500" />
    },
    {
        id: 7,
        user: "Anna Kim",
        action: "left the group",
        group: "Chess Club",
        time: "2 weeks ago",
        unread: false,
        icon: <FaUserCircle className="h-6 w-6 text-gray-500" />
    }
];

const NotificationPage = () => {
    const unreadCount = notifications.filter(notification => notification.unread).length;

    return (
        <div className="lg:max-w-screen w-full 2xl:w-[50vw] mx-auto p-4.5 bg-gray-50 min-h-screen px-5 sm:px-20 ">
            <div className="flex justify-between items-center mb-4">
                <h1  className="text-base sm:text-2xl font-bold">Notifications ({unreadCount})</h1>
                <button className="text-base text-blue-500">Mark all as read</button>
            </div>
            <div className="space-y-4">
                {notifications.map(notification => (
                    <div key={notification.id} className={`p-4 rounded-lg //shadow hover:bg-gray-100 transition ${notification.unread ? 'bg-blue-50' : 'bg-white'}`}>
                        <div className="flex items-center">
                            <div className="mr-4">
                                {notification.icon}
                            </div>
                            <div className="flex-1">
                                <p className="font-bold">{notification.user}</p>
                                <p>{notification.action} {notification.post && <span className="font-bold">{notification.post}</span>} {notification.group && <span className="font-bold">{notification.group}</span>}</p>
                                {notification.message && <p className="mt-2">{notification.message}</p>}
                            </div>
                        </div>
                        <div className="text-sm text-gray-500 mt-2 text-right">
                            {notification.time}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NotificationPage;