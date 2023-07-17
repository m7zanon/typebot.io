import { DropdownList } from '@/components/DropdownList'
import { VariableSearchInput } from '@/components/inputs/VariableSearchInput'
import { TableListItemProps } from '@/components/TableList'
import { Stack } from '@chakra-ui/react'
import { Variable } from '@typebot.io/schemas'
import {
  ChatCompletionOpenAIOptions,
  chatCompletionResponseValues,
} from '@typebot.io/schemas/features/blocks/integrations/openai'

type Props = TableListItemProps<
  ChatCompletionOpenAIOptions['responseMapping'][number]
>

export const ChatCompletionResponseItem = ({ item, onItemChange }: Props) => {
  const changeValueToExtract = (
    valueToExtract: (typeof chatCompletionResponseValues)[number]
  ) => {
    onItemChange({ ...item, valueToExtract })
  }

  const changeVariableId = (variable: Pick<Variable, 'id'> | undefined) => {
    onItemChange({ ...item, variableId: variable ? variable.id : undefined })
  }

  return (
    <Stack p="4" rounded="md" flex="1" borderWidth="1px">
      <DropdownList
        currentItem={item.valueToExtract ?? 'Message content'}
        items={chatCompletionResponseValues}
        onItemSelect={changeValueToExtract}
      />
      <VariableSearchInput
        onSelectVariable={changeVariableId}
        initialVariableId={item.variableId}
      />
    </Stack>
  )
}
