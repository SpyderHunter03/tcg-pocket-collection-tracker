import type { Card, CollectionRow, Expansion, Pack } from '@/types'
import A1 from '../../assets/cards/A1.json'
import A1a from '../../assets/cards/A1a.json'
import A2 from '../../assets/cards/A2.json'
import PA from '../../assets/cards/P-A.json'

const update = (cards: Card[], expansionName: string) => {
  for (const card of cards) {
    // @ts-ignore there is an ID in the JSON, but I don't want it in the Type because you should always use the card_id, having both is confusing.
    card.card_id = `${expansionName}-${card.id}`
    card.expansion = expansionName
  }
  return cards
}

export const a1Cards: Card[] = update(A1 as unknown as Card[], 'A1')
export const a2Cards: Card[] = update(A2 as unknown as Card[], 'A2')
export const a1aCards: Card[] = update(A1a as unknown as Card[], 'A1a')
export const paCards: Card[] = update(PA as unknown as Card[], 'P-A')
export const allCards: Card[] = [...a1Cards, ...a2Cards, ...a1aCards, ...paCards]

export const expansions: Expansion[] = [
  {
    name: 'Genetic Apex',
    id: 'A1',
    cards: a1Cards,
    packs: [
      { name: 'Mewtwo pack', color: '#986C88' },
      { name: 'Charizard pack', color: '#E2711B' },
      { name: 'Pikachu pack', color: '#EDC12A' },
      { name: 'Every pack', color: '#CCCCCC' },
    ],
    tradeable: true,
  },
  {
    name: 'Mythical Island',
    id: 'A1a',
    cards: a1aCards,
    packs: [{ name: 'Mew pack', color: '#FFC1EA' }],
    tradeable: true,
  },
  {
    name: 'Space-Time Smackdown',
    id: 'A2',
    cards: a2Cards,
    packs: [
      { name: 'Dialka pack', color: '#A0C5E8' },
      { name: 'Palkia pack', color: '#D5A6BD' },
      { name: 'Every pack', color: '#CCCCCC' },
    ],
    tradeable: false,
  },
  {
    name: 'Promo-A',
    id: 'PA',
    cards: paCards,
    packs: [{ name: 'Every pack', color: '#CCCCCC' }],
    tradeable: false,
    promo: true,
  },
]

export const tradeableRaritiesDictionary: { [id: string]: number } = {
  '◊': 0,
  '◊◊': 0,
  '◊◊◊': 120,
  '◊◊◊◊': 500,
  '☆': 500,
}

export const nrOfCardsOwned = (ownedCards: CollectionRow[], expansion?: Expansion, pack?: string) => {
  if (!expansion) {
    return ownedCards.filter((oc) => oc.amount_owned > 0).length
  }

  return ownedCards.filter((oc) => {
    if (pack) {
      return expansion.cards.find((c) => c.pack === pack && c.card_id === oc.card_id && oc.amount_owned > 0)
    }
    return expansion.cards.find((c) => c.card_id === oc.card_id && oc.amount_owned > 0)
  }).length
}

export const totalNrOfCards = (expansion?: Expansion, pack?: string) => {
  if (!expansion) {
    return allCards.length
  }
  if (!pack) {
    return expansion.cards.length
  }
  return expansion.cards.filter((c) => c.pack === pack).length
}

export const pullRate = (ownedCards: CollectionRow[], expansion: Expansion, pack: Pack) => {
  if (ownedCards.length === 0) {
    return 1
  }

  //probabilities

  const probabilityPerRarity1_3: Record<string, number> = {
    '◊': 100,
    '◊◊': 0,
    '◊◊◊': 0,
    '◊◊◊◊': 0,
    '☆': 0,
    '☆☆': 0,
    '☆☆☆': 0,
    'Crown Rare': 0,
  }
  const probabilityPerRarity4: Record<string, number> = {
    '◊': 0,
    '◊◊': 90,
    '◊◊◊': 5,
    '◊◊◊◊': 1.666,
    '☆': 2.572,
    '☆☆': 0.5,
    '☆☆☆': 0.222,
    'Crown Rare': 0.04,
  }
  const probabilityPerRarity5: Record<string, number> = {
    '◊': 0,
    '◊◊': 60,
    '◊◊◊': 20,
    '◊◊◊◊': 6.664,
    '☆': 10.288,
    '☆☆': 2,
    '☆☆☆': 0.888,
    'Crown Rare': 0.16,
  }
  console.log('calc pull rate for', pack.name, ownedCards.length)

  const cardsInPack = expansion.cards.filter((c) => c.pack === pack.name || c.pack === 'Every pack')
  // console.log('cards in pack', cardsInPack.length) //79
  const missingCards = cardsInPack.filter((c) => !ownedCards.find((oc) => oc.card_id === c.card_id && oc.amount_owned > 0))
  // console.log('missing cards', missingCards.length) //79

  let totalProbability1_3 = 0
  let totalProbability4 = 0
  let totalProbability5 = 0
  for (const card of missingCards) {
    const rarity = card.rarity

    const nrOfcardsOfThisRarity = cardsInPack.filter((c) => c.rarity === rarity).length
    // console.log('nr of cards of this rarity', rarity, nrOfcardsOfThisRarity) //nrOfcardsOfThisRarity = 25

    // the chance to get this card is the probability of getting this card in the pack divided by the number of cards of this rarity
    const chanceToGetThisCard1_3 = probabilityPerRarity1_3[rarity] / 100 / nrOfcardsOfThisRarity
    const chanceToGetThisCard4 = probabilityPerRarity4[rarity] / 100 / nrOfcardsOfThisRarity
    const chanceToGetThisCard5 = probabilityPerRarity5[rarity] / 100 / nrOfcardsOfThisRarity
    // console.log('chance to get this card', chanceToGetThisCard1_3) //0.02

    // add up the chances to get this card
    totalProbability1_3 += chanceToGetThisCard1_3
    totalProbability4 += chanceToGetThisCard4
    totalProbability5 += chanceToGetThisCard5
  }
  // console.log('totalProbability1_3', totalProbability1_3)
  // console.log('totalProbability4', totalProbability4)
  // console.log('totalProbability5', totalProbability5)

  // take the total probabilities per card draw (for the 1-3 you need to take the cube root of the probability) and multiply
  const chanceToGetNewCard = 1 - (1 - totalProbability1_3) ** 3 * (1 - totalProbability4) * (1 - totalProbability5)
  console.log('chance to get new card', chanceToGetNewCard)

  return chanceToGetNewCard
}
