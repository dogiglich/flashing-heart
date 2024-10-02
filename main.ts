{
    name: Build; MicroPython

    on:
    push:
    branches: '*'
    pull_request:
    branches: '*'

    jobs:
    build:
    runs - on: ubuntu - 20.04
    name: Build MicroPython
    steps:
    - uses: actions / checkout@v4
      # Yotta has some issues with Python 3.7 +
        - name: Install Python 3.6
    uses: actions / setup - python@v5
    with:
    python - version: 3.6
        - name: Install GNU Arm Embedded Toolchain(arm - none - eabi - gcc)
    uses: carlosperate / arm - none - eabi - gcc - action@v1
    with:
    release: "10.3-2021.10"
        - name: Install CMake, Ninja & Yotta
    run: pip install cmake == 3.22.3 ninja == 1.10.2.3 yotta == 0.20.5
        - name: Install srecord
    run: sudo apt - get install - y srecord
        - name: Check Versions
    run: |
        arm - none - eabi - gcc--version
    cmake--version
    ninja--version
    python--version
    yotta--version
        - name: Set up the Yotta target from GitHub
    run: |
        yotta target bbc - microbit - classic - gcc - nosd@https://github.com/lancaster-university/yotta-target-bbc-microbit-classic-gcc-nosd
    yotta up
        - run: make qstrs
            - run: git diff
                - run: make all
                    - name: Process date for artifact filename
        id: date
    run: echo "BUILD_DATE=$(date +'%Y-%m-%d')" >> $GITHUB_ENV
        - name: Upload hex file
    uses: actions / upload - artifact@v4
    with:
    name: microbitv1 - micropython - ${ { env.BUILD_DATE } } -${ { github.sha } }.hex
    path: build / firmware.hex