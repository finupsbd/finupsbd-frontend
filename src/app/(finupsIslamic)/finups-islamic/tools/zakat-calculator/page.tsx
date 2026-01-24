import MetalPriceCalculator from '@/components/finups-islamic/tools/zakat-calculator/GoldSilverCalculator'
import ZakatCalculator from '@/components/finups-islamic/tools/zakat-calculator/ZakatCalculator'
import ZakatCalculatorNew from '@/components/finups-islamic/tools/zakat-calculator/ZakatCalculatorNew'
import ZakatWarning from '@/components/finups-islamic/tools/zakat-calculator/ZakatWarning'
import React from 'react'

const ZakatCalculatorPage = () => {
  return (
    <div>
      {/* <ZakatCalculator/> */}
      <ZakatWarning/>
      <ZakatCalculatorNew/>
      {/* <MetalPriceCalculator/> */}
    </div>
  )
}

export default ZakatCalculatorPage
