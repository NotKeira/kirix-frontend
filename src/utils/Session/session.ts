import { parse, serialize } from "cookie";

export interface SessionData {
    id: string;
    username: string;
    tokens: {
        access: string;
        refresh: string;
    };
    expiresAt: number;
};

const cookieName = "user_session";
const maxAge = 60 * 60 * 24 * 7; // 1 week

function getSession(req: { headers: { cookie?: string}}): SessionData | null {
    const cookies = parse(req.headers.cookie || '');
    const sessionCookie = cookies[cookieName];
    if (!sessionCookie) return null;

    try {
        const session: SessionData = JSON.parse(sessionCookie);
        if (session.expiresAt < Date.now()) {
            return null;
        }
        return session;
    } catch (error) {
        return null;
    }
}

function createSession(sessionData: SessionData): string {
    const session = {
        ...sessionData,
        expiresAt: Date.now() + maxAge * 1000,
    }

    return serialize(cookieName, encodeURIComponent(JSON.stringify(session)), {
        httpOnly: true,
        secure: process.env.MODE === "production",
        sameSite: "strict",
        maxAge: maxAge,
        path: "/",
    });
};

function destroySession(): string {
    return serialize(cookieName, "", {
        httpOnly: true,
        secure: process.env.MODE === "production",
        sameSite: "strict",
        maxAge: -1,
        path: "/",
    });
}

export { getSession, createSession, destroySession};