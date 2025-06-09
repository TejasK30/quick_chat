import { Kafka } from "kafkajs"

const kafka = new Kafka({
  clientId: "chats",
  brokers: [`localhost:9092`],
})

export const producer = kafka.producer()
export const consumer = kafka.consumer({ groupId: "chats" })

export const connectKafkaProducer = async () => {
  try {
    await producer.connect()
    console.log("✅ Kafka producer connected")
  } catch (err) {
    console.error("❌ Failed to connect Kafka producer:", err)
  }
}
