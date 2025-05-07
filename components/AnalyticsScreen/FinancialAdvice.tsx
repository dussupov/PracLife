import React, { useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { HfInference } from "@huggingface/inference";

interface FinancialAdviceProps {
  data: any[];  // данные, которые ты хочешь отправить для анализа
}

const FinancialAdvice: React.FC<FinancialAdviceProps> = ({ data }) => {
  const [advice, setAdvice] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Заменить на свой API ключ Hugging Face
  const client = new HfInference("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");

  const fetchAdvice = async () => {
    setLoading(true); // Включаем лоадер и блокируем кнопку
    setAdvice(null)
    try {
      const chatCompletion = await client.chatCompletion({
        provider: "fireworks-ai",
        model: "deepseek-ai/DeepSeek-R1",
        messages: [
          {
            role: "user",
            content: `Проанализируй мои финансовые операции: ${JSON.stringify(data)}.  
            Дай советы по экономии и оптимизации расходов.  
            Ответ должен содержать не более 2-3 кратких, четких предложений, без эмодзи.  
            Каждый совет должен быть конкретным и выполнимым, с акцентом на реальные шаги по сокращению расходов.  
            Не включай развернутый анализ, только сжатые рекомендации. 
            
            Сделай это в виде кратких, четких предложений, которые легко выполнить.
            Формат ответа:
            1. Совет 1
            Отступ
            2. Совет 2
            Отступ.
            3. Совет 3
            Отступ.
            4. Совет 4
            Отступ.
            
            Для хорошо читаймого текста
            `,
          },
        ],
      });

      const rawContent = chatCompletion.choices[0].message?.content || '';

      // Удаляем весь блок <think>...</think>
      const cleanedContent = rawContent.replace(/<think>[\s\S]*?<\/think>/g, '').trim();

      setAdvice(cleanedContent);

    } catch (error) {
      setAdvice('Ошибка получения совета. Попробуйте позже.');
      console.error(error);
    } finally {
      setLoading(false); // Снимаем лоадер и блокировку кнопки
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={fetchAdvice}
        disabled={loading} // Блокируем кнопку, если идет запрос
      >
        <Text style={styles.buttonText}>Получить советы</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#4CAF50" />}

      {advice && (
        <View style={styles.adviceContainer}>
          <Text style={styles.adviceTitle}>Советы по финансам:</Text>
          <Text style={styles.adviceText}>{advice}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1C1C1E',
    padding: 16,
    borderRadius: 12,
    marginVertical: 16,
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

export default FinancialAdvice;
