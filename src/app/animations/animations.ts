import { query, style, animate, group, transition, trigger, state } from '@angular/animations';

export const toggleModal =
    trigger('toggleModal', [
        transition(':enter', [
            style({ opacity: 0 }),
            group([
                animate('.2s ease', style({ opacity: 1 })),
                query('.card', [
                    style({ opacity: 0, transform: 'translateX(-300px)' }),
                    animate('.2s ease', style({ opacity: 1, transform: 'translateX(0px)' }))
                ])
            ])
        ]),
        transition(':leave', [
            group([
                query('.card', animate('.2s ease', style({ opacity: 0, transform: 'translateX(300px)' }))),
                animate('.2s ease', style({ opacity: 0 }))
            ])
        ])
    ]);

export const slideInOut =
    trigger('slideInOut', [
        transition(':enter', [
            style({ transform: 'translateX(-40px)', opacity: 0 }),
            animate('.5s ease', style({ transform: 'translateX(0px)', opacity: 1 }))
        ]),
        transition(':leave', [
            animate('.5s ease', style({ transform: 'translateX(40px)', opacity: 0 }))
        ]),
    ]);

export const toggleHeight =
    trigger('toggleHeight', [
        transition(':enter', [
            style({ height: '0', padding: '0', overflow: 'hidden' }),
            animate('.2s ease', style({ height: 'auto', padding: '10px', overflow: 'visible' }))
        ]),
        transition(':leave', [
            animate('.2s ease', style({ height: '0', padding: '0', overflow: 'hidden' }))
        ]),
    ]);

export const viewCategoryAnimation =
    trigger('viewCategoryAnimation', [
        state('normal', style({left: 0, width: '100%'})),
        state('hovered', style({right: 0, width: 0})),
        transition('normal => hovered', animate('.4s ease')),
        transition('hovered => normal', [
            style({left: 0}),
            animate('.4s ease')
        ])
    ]);
