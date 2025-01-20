import { SessionData } from "./session";

function isValid(session: SessionData): boolean {
    return (
        typeof session.id === "string" &&
        typeof session.username === "string" &&
        session.tokens &&
        typeof session.tokens.access === "string" &&
        typeof session.tokens.refresh === "string" &&
        typeof session.expiresAt === "number"
    );
}

function extendSession(session: SessionData): SessionData {
    return {
        ...session, 
        expiresAt: Date.now() + 60 * 60 * 1000
    }
}

export { isValid, extendSession };