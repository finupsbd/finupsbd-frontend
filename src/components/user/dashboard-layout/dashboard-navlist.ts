import { Bell, HelpCircle, HelpCircleIcon, Languages, PanelRightInactiveIcon, Settings2, SquareTerminal, TerminalSquare, User2 } from "lucide-react";

export const navList = {
    navMain: [
        {
            title: "Account Settings",
            url: "/user/setting",
            icon: Settings2,
            items: [
                {
                    title: "Change Password",
                    url: "/user/setting/update-password",
                },
                {
                    title: "Update Email/Mobile",
                    url: "/user/setting/update-email-mobile",
                },
            ],
        },
    ],
    profile: [
        {
            name: "Personal Informations",
            url: "/user/profile",
            icon: User2,
        }
    ],
    myItems: [
        {
            title: "Applications",
            url: "#",
            icon: SquareTerminal,
            isActive: false,
            items: [
                // {
                //     title: "Loan Application",
                //     url: "/user/loan-application",
                // },
                {
                    title: "My Applications",
                    url: "/user/my-application/my-application-loan",
                },
            ],
        },
        // {
        //     title: "My Cards",
        //     url: "#",
        //     icon: SquareTerminal,
        //     isActive: false,
        //     items: [
        //         {
        //             title: "Loan Application",
        //             url: "/user/loan-application",
        //         },
        //     ],
        // },
        // {
        //     title: "My Insurance",
        //     url: "#",
        //     icon: SquareTerminal,
        //     isActive: false,
        //     items: [
        //         {
        //             title: "Loan Application",
        //             url: "/user/loan-application",
        //         },

        //     ],
        // },
        // {
        //     name: "Favourite",
        //     url: "#",
        //     icon: HelpCircleIcon,
        // },

    ],
    settings: [
        {
            name: "Push Notification",
            url: "#",
            icon: Bell,
        },
        {
            name: "Language",
            url: "#",
            icon: Languages,
        },
    ],
    others: [
        {
            name: "Support",
            url: "/user/other/support",
            icon: HelpCircleIcon,
        },
        {
            name: "Frequently Asked Qustions",
            url: "/user/other/faq",
            icon: HelpCircle,
        },
        {
            name: "Terms & Conditions",
            url: "/user/other/terms-conditions",
            icon: TerminalSquare,
        },
        {
            name: "Privacy Policy",
            url: "/user/other/privacy-policy",
            icon: PanelRightInactiveIcon,
        },
    ],
};
