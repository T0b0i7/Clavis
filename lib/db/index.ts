/*
 * Clavis - Free Typing Test with Mechanical Keyboard Sounds
 * Created by Eucher O. ABATTI (T0b0i7) - (c) 2026
 * License: Star https://github.com/T0b0i7/Clavis before use
 */

import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { env } from "@/lib/env";

const url = env.DATABASE_URL;
const authToken = env.DATABASE_AUTH_TOKEN;

export const db =
  url && authToken
    ? drizzle(createClient({ url, authToken }))
    : null;
