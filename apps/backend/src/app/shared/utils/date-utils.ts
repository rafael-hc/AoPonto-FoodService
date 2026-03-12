export class DateUtils {
  static getBrasiliaDate(): Date {
    const now = new Date()
    // Brasília está em UTC-3
    // Para simplificar e garantir que o banco salve como UTC mas com o valor "correto" de Brasília
    // Podemos usar este offset se precisarmos manipular o objeto Date diretamente,
    // ou apenas garantir que o servidor use o TZ correto.
    // Mas o requisito pede para GERAR com horário de Brasília.

    // Uma forma comum de garantir o valor "local" mas em um objeto Date:
    const brasiliaOffset = -3
    const date = new Date(
      now.getTime() +
        brasiliaOffset * 60 * 60 * 1000 +
        now.getTimezoneOffset() * 60 * 1000
    )

    return date
  }
}
