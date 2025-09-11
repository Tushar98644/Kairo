import { DuckDuckGoSearch } from '@langchain/community/tools/duckduckgo_search'
import { tool } from '@langchain/core/tools'
import { z } from 'zod'

export const webSearchTool = new DuckDuckGoSearch({
  maxResults: 1,
});