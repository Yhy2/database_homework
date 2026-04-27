<template>
  <article class="flow-graphic" aria-label="校园二手平台数据流图">
    <span class="flow-graphic__sr">用户 User 商品 Item 订单 Orders 统计视图 View</span>

    <div class="flow-graphic__copy">
      <p class="section-kicker">Data Flow</p>
      <h3>从用户发布到订单统计的数据闭环</h3>
    </div>

    <svg class="flow-graphic__canvas" viewBox="0 0 720 220" role="img">
      <title>用户、商品、订单和统计视图的数据流转</title>
      <defs>
        <linearGradient id="market-flow-line" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stop-color="#c70024" stop-opacity="0.2" />
          <stop offset="50%" stop-color="#c70024" stop-opacity="0.95" />
          <stop offset="100%" stop-color="#11161f" stop-opacity="0.5" />
        </linearGradient>
      </defs>

      <path
        class="flow-graphic__stream"
        d="M120 110 C210 30 280 30 360 110 S510 190 600 110"
      />
      <path
        class="flow-graphic__stream flow-graphic__stream--soft"
        d="M120 110 C210 190 280 190 360 110 S510 30 600 110"
      />

      <g class="flow-graphic__node" transform="translate(62 70)">
        <circle class="flow-graphic__pulse" cx="48" cy="40" r="44" />
        <text x="48" y="34">用户</text>
        <text x="48" y="56">User</text>
      </g>

      <g class="flow-graphic__node" transform="translate(242 70)">
        <circle class="flow-graphic__pulse flow-graphic__pulse--delay-1" cx="48" cy="40" r="44" />
        <text x="48" y="34">商品</text>
        <text x="48" y="56">Item</text>
      </g>

      <g class="flow-graphic__node" transform="translate(422 70)">
        <circle class="flow-graphic__pulse flow-graphic__pulse--delay-2" cx="48" cy="40" r="44" />
        <text x="48" y="34">订单</text>
        <text x="48" y="56">Orders</text>
      </g>

      <g class="flow-graphic__node" transform="translate(574 70)">
        <circle class="flow-graphic__pulse flow-graphic__pulse--delay-3" cx="48" cy="40" r="44" />
        <text x="48" y="34">统计视图</text>
        <text x="48" y="56">View</text>
      </g>
    </svg>
  </article>
</template>
