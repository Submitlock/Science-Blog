import { query, style, animate, group, transition, trigger } from '@angular/animations';

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
            style({ transform: 'translatX(-20px)' }),
            animate('1s ease', style({ transform: 'translateX(0px)' }))
        ]),
    ]);
