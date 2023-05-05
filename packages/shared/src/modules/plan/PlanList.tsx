import { Box } from '@fower/react'
import { useRouter } from 'next/router'
import { Button, CheckOutline } from 'bone-ui'
import { PlanType } from '@ai-translator/api-sdk'

type PlanItem = {
  type: PlanType
  title: string
  desc: string
  price: string
  priceId?: string
  priceDesc?: string
  features: string[]
  isCurrentPlan?: boolean
}

interface Props {
  canUpgrade?: boolean
  onUpgrade?(item: PlanItem): any
}

export function PlanList({ canUpgrade = false, onUpgrade }: Props) {
  const { push } = useRouter()

  const plans: PlanItem[] = [
    {
      type: PlanType.Free,
      title: 'Free',
      desc: 'The basics for individuals',
      price: 'Free',
      features: [
        'Collaboration for 3 users',
        'Export session data',
        'Share session data',
        'Use all type of provider',
        'Sync data for all devices',
      ],
    },

    {
      type: PlanType.Plus,
      title: 'Plus',
      desc: 'Advanced collaboration for individuals and teams',
      price: '$2',
      priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_PLUS,
      priceDesc: 'per user / month',
      features: [
        'Unlimited collaboration',
        'Export session data',
        'Share session data',
        'Use all type of provider',
        'Sync data for all devices',
        'Token count',
      ],
    },
  ]

  return (
    <Box columnGap-20 toCenterX>
      {plans.map((item, index) => {
        return (
          <Box
            key={item.title}
            border
            borderGray200
            px4
            roundedXL
            py6
            w-320
            roundedNone={canUpgrade}
            mr--1={canUpgrade}
          >
            <Box
              text2XL
              fontBold
              mb2
              yellow500={index === 0}
              red500={index === 1}
              purple500={index === 2}
            >
              {item.title}
            </Box>
            <Box textLG h-60 textSM={canUpgrade}>
              {item.desc}
            </Box>
            <Box>
              <Box text3XL fontBold>
                {item.price}
              </Box>
              <Box gray500 textSM h-2em>
                {item.priceDesc}
              </Box>
            </Box>

            {canUpgrade && (
              <Button
                w-100p
                disabled={item.isCurrentPlan}
                variant={item.isCurrentPlan ? 'light' : 'filled'}
                colorScheme={item.isCurrentPlan ? 'gray700' : 'brand500'}
                onClick={() => {
                  // if(item.)
                  onUpgrade?.(item)
                }}
              >
                {item.isCurrentPlan ? 'Current Plan' : 'Upgrade'}
              </Button>
            )}

            {!canUpgrade && (
              <Button w-100p colorScheme="brand500" mt8 onClick={() => push('/')}>
                Get started
              </Button>
            )}
            <Box mt-40 leadingLoose>
              {item.features.map((f) => (
                <Box key={f} toCenterY spaceX2 textBase textSM={canUpgrade}>
                  <CheckOutline size={20} gray500 />
                  <Box>{f}</Box>
                </Box>
              ))}
            </Box>
          </Box>
        )
      })}
    </Box>
  )
}
