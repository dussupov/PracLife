import React, { useEffect, useState } from "react";
import { View, Button, Image, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { HfInference } from "@huggingface/inference";

const CheckAnalytics = () => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const API_KEY = "22e1b9710c1e4270c1687768827880f9";
  const [advice, setAdvice] = useState<string | null>(null);
  const client = new HfInference("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");

  const fetchAdvice = async () => {
    if (images.length === 0) return;

    setLoading(true);
    setAdvice(null);

    try {
      const messages = [
        ...images.map((imageUrl) => ({
          type: "image_url",
          image_url: { url: imageUrl },
        })),
        {
          type: "text",
          text: "1.распознай текст на изображении." +
            " 2. Проанализируй распознанный текст и найди ключевые элементы транзакции:" +
            " • сумма," +
            " • валюта," +
            " • дата (если указана)," +
            " • назначение платежа (например, название магазина или описание услуги)." +
            " 3. На основе содержания сообщения определи категорию расхода, используя следующие категории:" +
            " • Продукты" +
            " • Транспорт" +
            " • Развлечения" +
            " • Подписки" +
            " • Коммунальные услуги" +
            " • Рестораны и кафе" +
            " • Здоровье" +
            " • Одежда и аксессуары" +
            " • Прочие расходы" +
            "Если ты не можешь с уверенностью определить категорию, или в тексте нет контекста, указывающего на одну из вышеуказанных категорий — отнеси транзакцию в категорию “Прочие расходы”."
        },
      ];

      const chatCompletion = await client.chatCompletion({
        provider: "hyperbolic",
        model: "Qwen/Qwen2.5-VL-72B-Instruct",
        messages: [
          {
            role: "user",
            content: messages,
          },
        ],
      });

      const rawContent = chatCompletion.choices[0].message?.content || '';
      const cleanedContent = rawContent.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
      setAdvice(cleanedContent);

    } catch (error) {
      setAdvice('Ошибка получения совета. Попробуйте позже.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const pickImages = async () => {
    if (images.length >= 4) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setLoading(true);
      const uploadedImages = [];

      for (const asset of result.assets) {
        try {
          const base64String = asset.base64;
          if (!base64String) continue;

          const response = await axios.post(
            `https://api.imgbb.com/1/upload?key=${API_KEY}`,
            new URLSearchParams({
              image: base64String,
            }),
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          );

          uploadedImages.push(response.data.data.url);
        } catch (error) {
          console.error("Ошибка загрузки файла:", error);
        }
      }

      setImages((prev) => [...prev, ...uploadedImages].slice(0, 4));
      setLoading(false);
    }
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImages} style={styles.button} disabled={loading || images.length >= 4}>
        <Text style={styles.buttonText}>Загрузить фото ({images.length}/4)</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#4CAF50" />}

      <View style={styles.imagesContainer}>
        {images.map((image, index) => (
          <View key={index} style={styles.imageWrapper}>
            <Image source={{ uri: image }} style={styles.image} />
            <TouchableOpacity onPress={() => removeImage(index)} style={styles.removeButton}>
              <Text style={styles.removeButtonText}>×</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {images.length > 0 && (
        <TouchableOpacity
          style={styles.button}
          onPress={fetchAdvice}
          disabled={loading}
        >
          <Text style={styles.buttonText}>Получить советы</Text>
        </TouchableOpacity>
      )}

      {advice && (
        <View style={styles.adviceContainer}>
          <Text style={styles.adviceTitle}>Советы по финансам:</Text>
          <Text style={styles.adviceText}>{advice}</Text>
        </View>
      )}
    </View>
  );
};

export default CheckAnalytics;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1C1C1E',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 12,
  },
  imageWrapper: {
    position: 'relative',
    width: 150,
    height: 150,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  removeButton: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#FF3B30',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  adviceContainer: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#2C2C2E',
    borderRadius: 8,
  },
  adviceTitle: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 8,
  },
  adviceText: {
    color: '#fff',
    fontSize: 16,
  },
});
