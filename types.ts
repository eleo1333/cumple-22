export enum Attendance {
    YES = "Sí, obvio",
    NO = "No puedo :(",
    MAYBE = "Capaz caigo"
}

export interface RsvpData {
    name: string;
    attendance: Attendance;
    contribution: string;
    songSuggestion: string;
    message: string;
}

export interface FaqItem {
    question: string;
    answer: string;
}
