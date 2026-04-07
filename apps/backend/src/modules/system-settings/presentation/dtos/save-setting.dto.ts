import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class SaveSettingDto {
  @ApiProperty({
    description: 'Nome único do parâmetro',
    example: 'HabilitarPedidos'
  })
  @IsString()
  @IsNotEmpty()
  parameter!: string

  @ApiProperty({
    description: 'Valor da configuração no formato texto',
    example: 'true',
    required: false
  })
  @IsString()
  @IsOptional()
  value?: string | null

  @ApiProperty({
    description: 'Tipo do dado armazenado (string, int, bool, date)',
    example: 'bool'
  })
  @IsString()
  @IsNotEmpty()
  type!: string

  @ApiProperty({
    description: 'Grupo lógico no modal de configurações',
    example: 'Configuração Geral'
  })
  @IsString()
  @IsNotEmpty()
  group!: string

  @ApiProperty({
    description: 'Descrição amigável em HTML ou texto puro',
    required: false
  })
  @IsString()
  @IsOptional()
  description?: string | null
}
