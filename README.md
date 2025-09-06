# Momentum DEX Position Range Monitor

This small utility monitors a specific LP position on [Momentum DEX](https://app.mmt.finance/) and prints whether the position is currently in range.

该工具用于监控 [Momentum DEX](https://app.mmt.finance/) 上指定的 LP 持仓，并打印该仓位当前是否处于区间内。

## Setup

Install dependencies:

```bash
npm install
```

安装依赖：

```bash
npm install
```

## Configuration

Set the following environment variables:

- `USER_ADDRESS` – Your Sui wallet address. Used to enumerate LP positions.
- `TARGET_POSITION_ID` – The Position object ID you want to monitor.
- `POLL_INTERVAL_SEC` – Optional polling interval in seconds (default: `20`).

配置以下环境变量：

- `USER_ADDRESS` – 你的 Sui 地址，用于枚举 LP 持仓。
- `TARGET_POSITION_ID` – 需要监控的 Position 对象 ID。
- `POLL_INTERVAL_SEC` – 轮询间隔秒（可选，默认 `20`）。

## Run

```bash
npx ts-node index.ts
```

The script will output `in-range` or `out-of-range` each interval. When a position becomes out of range, a `onOutOfRange()` callback is triggered where custom notifications can be integrated.

运行脚本：

```bash
npx ts-node index.ts
```

脚本会在每次轮询时输出 `in-range` 或 `out-of-range`。当仓位出圈时，会触发 `onOutOfRange()` 回调，可在此接入自定义通知（如 Telegram、Discord、邮件等）。
