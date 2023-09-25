let lt = 0;

class UI {
    ctx: CanvasRenderingContext2D;

    constructor() {
        const canvas = document.createElement('canvas');
        this.ctx = canvas.getContext('2d')!;
        document.body.append(canvas);
    }
}

class CPU {}

class PPU {}

class APU {}

class Mem {}
class Bus {}

class NES {
    public CPU: CPU = new CPU();
    public PPU: PPU = new PPU();
    public APU: APU = new APU();
    public Mem: Mem = new Mem();
    constructor() {}
}

type State = {
    ui: UI;
    nes: NES
}

function tick(dt: number){
}

function setup(): Promise<State> {
    return new Promise((res, rej) => {
        const state: State = {} as State;

        const ui = new UI();
        const nes = new NES();

        state['ui'] = ui;
        state['nes'] = nes;
        res(state);

        console.log('Setup complete')
        console.log('Starting  main loop...')
        console.log(state)
    })
}

function main_loop(state: State) {
    const now = performance.now();
    const dt = now - lt;
    lt = now;

    tick(dt);

    requestAnimationFrame(() => main_loop(state));
}

setup().then((state: State) => main_loop(state));
