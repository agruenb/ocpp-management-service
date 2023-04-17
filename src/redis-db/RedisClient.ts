import { createClient } from 'redis';

export type RedisClientType = ReturnType<typeof createClient>

export default function setUpRedis():RedisClientType{
    let redis_client = createClient({
        password: process.env.REDIS_SERVER_PASSWORD,
        socket: {
            host: process.env.REDIS_SERVER_URI,
            port: parseInt(process.env.REDIS_SERVER_PORT || "")
        }
    });
    redis_client.on('error', err => console.log("RedisClient", "Redis error", err));
    redis_client.on('connect', () => console.log("RedisClient", "Connected"));
    redis_client.connect();

    return redis_client;
}