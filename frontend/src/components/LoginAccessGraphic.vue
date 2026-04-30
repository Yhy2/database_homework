<template>
  <article class="flow-graphic" aria-label="账号登录权限流程图">
    <div class="flow-graphic__copy">
      <p class="section-kicker">Login Access Flow</p>
      <h3>从游客只读到账号写入的权限切换</h3>
    </div>

    <svg class="flow-graphic__canvas" viewBox="0 0 760 230" role="img">
      <title>游客只读、账号认证、登录状态和上架商品</title>

      <path class="flow-graphic__stream" d="M106 116 C210 52 300 52 382 116 S552 180 654 116" />
      <path class="flow-graphic__stream flow-graphic__stream--soft" d="M106 146 H654" />

      <g class="flow-graphic__step" transform="translate(42 66)">
        <rect class="flow-graphic__pulse" width="132" height="96" rx="22" />
        <text x="66" y="42">游客只读</text>
        <text x="66" y="66">Read Only</text>
      </g>

      <g class="flow-graphic__step" transform="translate(224 66)">
        <rect class="flow-graphic__pulse flow-graphic__pulse--delay-1" width="132" height="96" rx="22" />
        <text x="66" y="42">账号认证</text>
        <text x="66" y="66">Auth Token</text>
      </g>

      <g class="flow-graphic__step" transform="translate(406 66)">
        <rect class="flow-graphic__pulse flow-graphic__pulse--delay-2" width="132" height="96" rx="22" />
        <text x="66" y="42">账号模式</text>
        <text x="66" y="66">Write Access</text>
      </g>

      <g class="flow-graphic__step" transform="translate(588 66)">
        <rect class="flow-graphic__pulse flow-graphic__pulse--delay-3" width="132" height="96" rx="22" />
        <text x="66" y="42">上架商品</text>
        <text x="66" y="66">Create Item</text>
      </g>
    </svg>
  </article>
</template>
