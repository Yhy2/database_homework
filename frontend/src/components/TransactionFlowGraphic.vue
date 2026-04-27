<template>
  <article class="flow-graphic" aria-label="购买事务动态流程图">
    <div class="flow-graphic__copy">
      <p class="section-kicker">Transaction Flow</p>
      <h3>一次购买请求如何保持数据一致</h3>
    </div>

    <svg class="flow-graphic__canvas" viewBox="0 0 760 230" role="img">
      <title>锁定商品、写入订单、更新状态和拒绝重复购买</title>

      <path class="flow-graphic__stream" d="M110 115 H650" />
      <path class="flow-graphic__stream flow-graphic__stream--soft" d="M650 145 C520 205 250 205 110 145" />

      <g class="flow-graphic__step" transform="translate(48 62)">
        <rect class="flow-graphic__pulse" width="126" height="96" rx="22" />
        <text x="63" y="44">锁定商品</text>
        <text x="63" y="68">FOR UPDATE</text>
      </g>

      <g class="flow-graphic__step" transform="translate(230 62)">
        <rect class="flow-graphic__pulse flow-graphic__pulse--delay-1" width="126" height="96" rx="22" />
        <text x="63" y="44">写入订单</text>
        <text x="63" y="68">INSERT</text>
      </g>

      <g class="flow-graphic__step" transform="translate(412 62)">
        <rect class="flow-graphic__pulse flow-graphic__pulse--delay-2" width="126" height="96" rx="22" />
        <text x="63" y="44">更新状态</text>
        <text x="63" y="68">status = 1</text>
      </g>

      <g class="flow-graphic__step" transform="translate(594 62)">
        <rect class="flow-graphic__pulse flow-graphic__pulse--delay-3" width="126" height="96" rx="22" />
        <text x="63" y="44">拒绝重复购买</text>
        <text x="63" y="68">UNIQUE</text>
      </g>
    </svg>
  </article>
</template>
