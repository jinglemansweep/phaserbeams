#!/bin/bash

WLED_URL="http://10.0.2.86"

curl -X POST \
    -H "Content-Type: application/json" \
    -d '{"seg": {"i": [100,[255,0,0]]}}' \
    ${WLED_URL}/json/state
